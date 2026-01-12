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
    <section className="relative py-10 px-4 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-16">
          O'quv maktabimiz asoschilari{" "}
          <span className="text-orange-500">ta'lim sohasidagi</span> tajribali
          tadbirkorlardir
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
            <p className="text-sm">Cambridge LC</p>
            <p className="text-sm">Modme IT</p>
            <p className="text-sm">Mars IT School</p>
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
            <p className="text-sm">CEO Get Coffee</p>
            <p className="text-sm">CEO Mars IT</p>
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
            <p className="text-sm">Direktor Mars IT</p>
            <p className="text-sm">Modme asoschisi</p>
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
    className="relative flex flex-col items-center space-y-4"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    {!reverse && (
      <div className="relative p-4 rounded-2xl border border-orange-400/40 bg-orange-500/10 text-white text-center">
        {children}
        <button
          className="mt-4 px-4 py-2 rounded-full bg-orange-500 text-sm"
          onClick={() => setActivePerson(person)}
        >
          Batafsil
        </button>
      </div>
    )}

    <img src={img} className="w-36 h-36 rounded-full object-cover" />
    <h2 className="text-lg font-semibold">{name}</h2>

    {reverse && (
      <div className="relative p-4 rounded-2xl border border-orange-400/40 bg-orange-500/10 text-white text-center">
        {children}
        <button
          className="mt-4 px-4 py-2 rounded-full bg-orange-500 text-sm"
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
            className="absolute inset-0 bg-black/40 rounded-2xl z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePerson(null)}
          />

          {/* Modal */}
          <motion.div
            className="absolute z-50 left-1/2 top-1/2
                       -translate-x-1/2 -translate-y-1/2
                       bg-white text-gray-900
                       w-[90%] max-w-xs
                       rounded-xl p-4 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <PersonContent img={modalImg} name={name} text={modalText} />
            <button
              onClick={() => setActivePerson(null)}
              className="mt-3 w-full py-2 rounded-lg border text-sm hover:bg-gray-100"
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
      className="w-28 h-28 mx-auto rounded-full mb-3 object-cover"
    />
    <h3 className="text-lg font-bold text-center">{name}</h3>
    <p className="mt-2 text-center text-gray-700 text-sm leading-relaxed">
      {text}
    </p>
  </>
);