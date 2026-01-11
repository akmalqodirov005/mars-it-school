import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* =======================
   MARS SHADER
======================= */
const MarsShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
    float noise(vec3 x) { vec3 i = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f); 
      return mix(
        mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
        f.z
      );
    }
    float fbm(vec3 p) { float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec3 pos = position;
      float d = fbm(position*2.0)*0.05;
      pos += normal*d;
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    varying vec3 vNormal;
    varying vec3 vPosition;
    float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
    float noise(vec3 x) { vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
      return mix(
        mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
        f.z
      );
    }
    float fbm(vec3 p){ float v=0.0; float a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.0; a*=0.5;} return v; }
    void main() {
      vec3 rp=vec3(
        vPosition.x*cos(time*0.1)-vPosition.z*sin(time*0.1),
        vPosition.y,
        vPosition.x*sin(time*0.1)+vPosition.z*cos(time*0.1)
      );
      float n1=fbm(rp*3.0);
      float n2=fbm(rp*8.0);
      vec3 darkRed=vec3(0.35,0.15,0.1);
      vec3 red=vec3(0.7,0.25,0.15);
      vec3 orange=vec3(0.9,0.4,0.25);
      vec3 darkBrown=vec3(0.2,0.1,0.08);
      vec3 color=mix(darkRed,red,n1);
      color=mix(color,orange,n2*0.6);
      color=mix(color,darkBrown,smoothstep(0.6,0.8,n2));
      vec3 lightDir=normalize(vec3(1.0,0.6,1.0));
      float diff=max(dot(vNormal,lightDir),0.0)*0.8+0.2;
      color*=diff;
      float rim=1.0-max(dot(vNormal,vec3(0,0,1)),0.0);
      rim=pow(rim,3.0);
      color+=vec3(1.0,0.4,0.25)*rim*0.25;
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
  if (meshRef.current) meshRef.current.rotation.y += 0.1 * delta;
  if (materialRef.current) materialRef.current.uniforms.time.value = state.clock.elapsedTime;
});

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 128, 128]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={MarsShader.vertexShader}
          fragmentShader={MarsShader.fragmentShader}
          uniforms={{ time: { value: 0 } }}
        />
      </mesh>

      {/* Glow / Atmosphere */}
      <mesh scale={1.08}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          color="#ff6633"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      <pointLight intensity={1.5} color="#ff5522" distance={radius * 3} />
    </group>
  );
};

/* =======================
   MOON COMPONENT
======================= */
const Moon: React.FC<{ marsRadius: number }> = ({ marsRadius }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRadius = marsRadius + 0.65;
  const orbitSpeed = 0.4;

  useFrame((state) => {
    const t = state.clock.elapsedTime * orbitSpeed + Math.PI;
    if (meshRef.current) {
      meshRef.current.position.set(
        orbitRadius * Math.cos(t),
        orbitRadius * Math.sin(t),
        0
      );
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[marsRadius * 0.08, 20, 20]} />
      <meshStandardMaterial 
        color="#a0a0a0" 
        metalness={0.3} 
        roughness={0.9}
        bumpScale={0.02}
      />
    </mesh>
  );
};

/* =======================
   SCENE COMPONENT
======================= */
const Scene: React.FC = () => {
  const [marsRadius, setMarsRadius] = useState(1.8);
  const [topOffset, setTopOffset] = useState(0); // default 0px

  useEffect(() => {
    const handleResize = () => {
      let radius = 1.8;
      let top = 0;

      if (window.innerWidth < 640) { // sm
        radius = 1.0;
        top = -20; // kichik ekranda biroz yuqoriga siljitish
      } else if (window.innerWidth < 1024) { // md
        radius = 1.4;
        top = -40;
      } else { // lg va katta
        radius = 1.8;
        top = -60;
      }

      setMarsRadius(radius);
      setTopOffset(top);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="absolute z-100 left-0 right-0 m-auto w-full h-screen"
      style={{ top: `${topOffset}px` }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <fog attach="fog" args={['#000000', 5, 15]} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <directionalLight position={[-4, 2, -4]} intensity={0.25} color="#4466ff" />

        <Mars radius={marsRadius} />
        <Moon marsRadius={marsRadius} />

        <OrbitControls enableZoom={false} target={[0, 0, 0]} minDistance={4} maxDistance={12} />
      </Canvas>
    </div>
  );
};

export default Scene;