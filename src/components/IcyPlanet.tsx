import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

/* =======================
   MARS SHADER
======================= */
const MarsShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    float hash(vec3 p){ p = fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
    float noise(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
      return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),
                 mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                 mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
                 mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
    float fbm(vec3 p){ float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5;} return v;}
    void main(){ vNormal = normalize(normalMatrix*normal); vec3 pos=position+normal*fbm(position*2.0)*0.05; vPosition=pos; gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);}
  `,
  fragmentShader: `
    uniform float time; varying vec3 vNormal; varying vec3 vPosition;
    float hash(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
    float noise(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
      return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),
                 mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                 mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
                 mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
    float fbm(vec3 p){ float v=0.0; float a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.0; a*=0.5;} return v;}
    void main(){
      vec3 rp=vec3(vPosition.x*cos(time*0.1)-vPosition.z*sin(time*0.1),vPosition.y,vPosition.x*sin(time*0.1)+vPosition.z*cos(time*0.1));
      float n1=fbm(rp*3.0); float n2=fbm(rp*8.0);
      vec3 darkCyan=vec3(0.0,0.3,0.4); vec3 mediumCyan=vec3(0.2,0.65,0.85); vec3 lightCyan=vec3(0.5,0.9,1.0); vec3 icyWhite=vec3(0.85,0.95,1.0); vec3 glowCyan=vec3(0.4,1.0,1.0);
      vec3 color=mix(darkCyan,mediumCyan,n1); color=mix(color,lightCyan,n2*0.7); color=mix(color,icyWhite,smoothstep(0.5,0.85,n2));
      vec3 lightDir=normalize(vec3(1.0,0.6,1.0)); float diff=max(dot(vNormal,lightDir),0.0)*0.8+0.2; color*=diff;
      float rim=1.0-max(dot(vNormal,vec3(0,0,1)),0.0); rim=pow(rim,4.0); color+=glowCyan*rim*0.6;
      float emissive=smoothstep(0.6,0.9,n2); color+=glowCyan*emissive*0.4;
      gl_FragColor=vec4(color,1.0);
    }
  `
};

/* =======================
   MARS COMPONENT
======================= */
const Mars: React.FC<{ radius: number }> = ({ radius }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    if(meshRef.current) meshRef.current.rotation.y += 0.05 * delta;
    if(materialRef.current) materialRef.current.uniforms.time.value = state.clock.elapsedTime;
  });

  return (
    <group rotation={[-0.35,0,0]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[10,300,300]} />
        <shaderMaterial ref={materialRef} vertexShader={MarsShader.vertexShader} fragmentShader={MarsShader.fragmentShader} uniforms={{ time: { value: 0 } }} />
      </mesh>
      <mesh scale={1.15}>
        <sphereGeometry args={[10,200,200]} />
        <meshBasicMaterial color="#66ccff" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
      <pointLight intensity={2} color="#66ccff" distance={radius*4} />
    </group>
  );
};

/* =======================
   PLANET RINGS
======================= */
const PlanetRings: React.FC<{ radius: number }> = ({ radius }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if(ringRef.current) ringRef.current.rotation.z += 0.01;
  });

  return (
    <group rotation={[-Math.PI/5,4,0]}>
      <mesh ref={ringRef}>
        <ringGeometry args={[radius*2,radius*2.2,256]} />
        <meshBasicMaterial color="#66ccff" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false}/>
      </mesh>
      <mesh>
        <ringGeometry args={[radius*1.4,radius*2.5,256]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} side={THREE.DoubleSide} depthWrite={false}/>
      </mesh>
      <mesh>
        <ringGeometry args={[radius*1.6,radius*2.8,256]} />
        <meshBasicMaterial color="#66ccff" transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false}/>
      </mesh>
    </group>
  );
};

/* =======================
   ICE PLANET CANVAS
======================= */
const IcePlanet: React.FC = () => {
  const [marsRadius, setMarsRadius] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < 640) setMarsRadius(6);
      else if(window.innerWidth < 1024) setMarsRadius(8);
      else setMarsRadius(10);
    };
    handleResize();
    window.addEventListener('resize',handleResize);
    return () => window.removeEventListener('resize',handleResize);
  }, []);

  return (
    <div className="w-full h-125 sm:h-150 md:h-175 lg:h-200">
      <Canvas camera={{ position:[30,10,-45], fov:60 }}>
        <ambientLight intensity={0.2}/>
        <directionalLight position={[10,10,10]} intensity={0.6}/>
        <directionalLight position={[-8,5,-6]} intensity={0.25} color="#66ccff"/>
        <Mars radius={marsRadius} />
        <PlanetRings radius={marsRadius} />
        <OrbitControls enableZoom={false} target={[0,0,0]} />
      </Canvas>
    </div>
  );
};

/* =======================
   SECTION2 WITH MODAL
======================= */
const Section2: React.FC = () => {
  const [showModal,setShowModal] = useState(false);

  return (
    <section className="relative py-12 px-6 flex-1 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        <span className="text-orange-500">Mars IT</span>da o'qish kimlar uchun mos keladi?
      </h1>

      <p className="mt-4 text-center text-gray-300 font-medium max-w-2xl">
        <b>Darslar 9 yoshdan 17 yoshgacha barcha bolalar uchun,</b> ayniqsa
        kompyuter o'yinlaridan chalg'imaydigan va dasturlash olamiga qiziqishi katta bolganlar uchun
      </p>

      <button
        onClick={()=>setShowModal(true)}
        className="mt-6 px-8 py-3 rounded-2xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition shadow-lg"
      >
        Batafsil
      </button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={()=>setShowModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
            />

            {/* Modal content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{opacity:0, scale:0.92}}
              animate={{opacity:1, scale:1}}
              exit={{opacity:0, scale:0.95}}
              transition={{duration:0.3, ease:"easeOut"}}
              onClick={(e) => e.stopPropagation()} // ichidagi klik overlayni yopmaydi
            >
              <div className="bg-white text-gray-900 max-w-3xl w-full rounded-2xl p-8 shadow-2xl space-y-6">
                <div className="rounded-lg bg-gray-200 h-48 flex items-center justify-center bg-[url('/placeholder-phone.png')] bg-cover bg-center">
                  <h3 className="text-xl font-bold text-gray-900 text-center px-4">
                    Bola kun-u tun vaqtini gadjetlar kompyuter yoki noutbukda o'tqazadi
                  </h3>
                </div>
                <div className="rounded-lg bg-gray-200 h-48 flex items-center justify-center bg-[url('/placeholder-pc.png')] bg-cover bg-center">
                  <h3 className="text-xl font-bold text-gray-900 text-center px-4">
                    Bola kompyuter o'yinlarini yaxshi ko'radi va o'z o'yinini yaratishni hohlaydi
                  </h3>
                </div>

                <h2 className="text-center text-lg md:text-xl font-semibold text-gray-700">
                  O'quv markazimizda 0 dan boshlab kompyuter savodxonligi, dasturlash asoslari va o'yin yaratishni o'rganadigan kurslar mavjud
                </h2>

                <div className="text-center mt-4">
                  <button
                    onClick={()=>setShowModal(false)}
                    className="px-6 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-100 transition"
                  >
                    Yopish
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

/* =======================
   WRAPPER COMPONENT
======================= */
const IcePlanetSection: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="lg:w-1/2 w-full">
        <IcePlanet />
      </div>
      <div className="lg:w-1/2 w-full flex items-center justify-center">
        <Section2 />
      </div>
    </div>
  )
}

export default IcePlanetSection;