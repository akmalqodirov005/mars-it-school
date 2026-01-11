import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Section1: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <section className="relative py-32 px-6 text-white">
      {/* CONTENT */}
      <div className="relative h-100 py-12.5 z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide leading-tight">
          Farzandingizni o'yinlardan chalg‘itib{" "}
          <span className="text-orange-500">IT</span>ga yo‘naltiring
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 font-medium">
          9 yoshdan 17 yoshgacha bo‘lgan bolalar uchun kompyuter kurslari
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-10 px-8 py-4 rounded-2xl
                     bg-orange-500 text-white font-semibold text-lg
                     hover:bg-orange-600 transition shadow-lg"
        >
          Nega aynan <span className="font-bold">Mars IT School?</span>
        </button>
      </div>

      <AnimatePresence>
  {showModal && (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowModal(false)} // overlay click closes modal
      />

      {/* Modal content */}
      <motion.div
        className="fixed top-1/2 left-1/2 z-50 w-full max-w-3xl px-4 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()} // ❌ stops overlay click
      >
        <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-center">
            Nima uchun bizga ishonishingiz kerak?
          </h3>

          <p className="mt-4 text-center text-gray-600 font-medium">
            4 yil ichida minglab o‘quvchilarni tayyorladik, Toshkent bo‘ylab
            filiallar ochdik va kuchli o‘qituvchilar jamoasini yig‘dik.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              title="5000+ o‘quvchi"
              text="Haqiqiy loyihalar va erta yoshdanoq kasbiy o‘sish"
            />
            <StatCard
              highlight
              title="3000+ bola"
              text="Hozirda o‘qimoqda, har hafta yangi bilimlar"
            />
            <StatCard
              title="7 ta filial"
              text="Toshkent bo‘ylab zamonaviy va qulay joylar"
            />
            <StatCard
              title="50+ o‘qituvchi"
              text="Tanlovdan o‘tgan professional mentorlar"
            />
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setShowModal(false)}
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

const StatCard = ({
  title,
  text,
  highlight = false,
}: {
  title: string;
  text: string;
  highlight?: boolean;
}) => (
  <div
    className={`p-5 rounded-xl ${
      highlight
        ? "bg-orange-500 text-white"
        : "border border-gray-200"
    }`}
  >
    <h4 className="text-xl font-bold">{title}</h4>
    <p className="mt-2 text-sm font-medium opacity-90">{text}</p>
  </div>
);

export default Section1;