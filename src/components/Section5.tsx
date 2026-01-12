import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Atxam,
  Jahongir,
  Ruslan,
  Teacher1,
  Teacher2,
  Teacher3,
} from "../assets";

type Person = "jahongir" | "atxam" | "ruslan" | null;

const Section5 = () => {
  const [activePerson, setActivePerson] = useState<Person>(null);

  return (
    <section className="relative py-20 px-6 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-20">
          O'quv maktabimiz asoschilari{" "}
          <span className="text-orange-500">ta'lim sohasidagi</span> tajribali
          tadbirkorlardir
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* ================= JAHONGIR ================= */}
          <PersonCard
            activePerson={activePerson}
            setActivePerson={setActivePerson}
            person="jahongir"
            img={Teacher1}
            name="Jahongir Po'latov"
            modalImg={Jahongir}
            modalText="Mars IT School va Modme asoschisi. IT va ta’lim sohasida zamonaviy loyihalarni rivojlantiradi."
          >
            <p className="text-base">Cambridge LC</p>
            <p className="text-base">Modme IT</p>
            <p className="text-base">Mars IT School</p>
          </PersonCard>

          {/* ================= ATXAM ================= */}
          <PersonCard
            activePerson={activePerson}
            setActivePerson={setActivePerson}
            person="atxam"
            img={Teacher2}
            name="Atxam Shaisayev"
            modalImg={Atxam}
            modalText="Mars IT School asoschisi. Ta’lim va IT loyihalarni boshqarish bo‘yicha katta tajribaga ega."
            reverse
          >
            <p className="text-base">CEO Get Coffee</p>
            <p className="text-base">CEO Mars IT</p>
          </PersonCard>

          {/* ================= RUSLAN ================= */}
          <PersonCard
            activePerson={activePerson}
            setActivePerson={setActivePerson}
            person="ruslan"
            img={Teacher3}
            name="Ruslan Yo'ldoshev"
            modalImg={Ruslan}
            modalText="Mars IT School CTO. Modme EdTech platformasining texnik asoschisi."
          >
            <p className="text-base">Direktor Mars IT</p>
            <p className="text-base">Modme asoschisi</p>
          </PersonCard>
        </div>
      </div>
    </section>
  );
};

export default Section5;

/* ================= PERSON CARD ================= */

const PersonCard = ({
  person,
  activePerson,
  setActivePerson,
  img,
  name,
  modalImg,
  modalText,
  children,
  reverse = false,
}: {
  person: Person;
  activePerson: Person;
  setActivePerson: (p: Person) => void;
  img: string;
  name: string;
  modalImg: string;
  modalText: string;
  children: React.ReactNode;
  reverse?: boolean;
}) => (
  <motion.div
    className="relative flex flex-col items-center space-y-6"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    {!reverse && (
      <div className="relative p-5 rounded-2xl border border-orange-400/40 bg-orange-500/10 text-white text-center w-full">
        {children}
        <button
          className="mt-4 px-5 py-2 rounded-full bg-orange-500 text-base font-semibold"
          onClick={() => setActivePerson(person)}
        >
          Batafsil
        </button>
      </div>
    )}

    <img src={img} className="w-44 h-44 rounded-full object-cover" />
    <h2 className="text-xl font-semibold">{name}</h2>

    {reverse && (
      <div className="relative p-5 rounded-2xl border border-orange-400/40 bg-orange-500/10 text-white text-center w-full">
        {children}
        <button
          className="mt-4 px-5 py-2 rounded-full bg-orange-500 text-base font-semibold"
          onClick={() => setActivePerson(person)}
        >
          Batafsil
        </button>
      </div>
    )}

    {/* ===== CARD ICHIDAGI MODAL ===== */}
    <AnimatePresence>
      {activePerson === person && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePerson(null)}
          />

          {/* Modal */}
          <motion.div
            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 w-[90%] max-w-sm rounded-2xl p-5 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <PersonContent img={modalImg} name={name} text={modalText} />
            <button
              onClick={() => setActivePerson(null)}
              className="mt-4 w-full py-2 rounded-lg border text-base font-semibold hover:bg-gray-100"
            >
              Yopish
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </motion.div>
);

/* ================= PERSON CONTENT ================= */

const PersonContent = ({
  img,
  name,
  text,
}: {
  img: string;
  name: string;
  text: string;
}) => (
  <>
    <img
      src={img}
      className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
    />
    <h3 className="text-xl font-bold text-center">{name}</h3>
    <p className="mt-3 text-center text-gray-700 text-base leading-relaxed">
      {text}
    </p>
  </>
);