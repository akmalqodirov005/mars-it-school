import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Section1: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <section className="relative py-20 px-4 sm:py-32 text-white overflow-hidden">
      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl sm:max-w-5xl mx-auto text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide leading-snug sm:leading-tight">
          Farzandingizni o'yinlardan chalg‘itib{" "}
          <span className="text-orange-500">IT</span>ga yo‘naltiring
        </h1>

        <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-gray-300 font-medium">
          9 yoshdan 17 yoshgacha bo‘lgan bolalar uchun kompyuter kurslari
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 sm:mt-10 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl
                     bg-orange-500 text-white font-semibold text-sm sm:text-lg
                     hover:bg-orange-600 transition shadow-lg"
        >
          Nega aynan <span className="font-bold">Mars IT School?</span>
        </button>
      </div>

      {/* ===== MODAL (SECTION ICHIDA) ===== */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)} // 👈 TASHQARISI BOSILSA
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            {/* MODAL */}
            <motion.div
              className="relative bg-white text-gray-900 w-full max-w-xs sm:max-w-3xl
                   rounded-2xl p-4 sm:p-8 shadow-2xl mx-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()} // 👈 MODAL ICHI BOSILSA YOPILMAYDI
            >
              <h3 className="text-xl sm:text-3xl font-bold text-center">
                Nima uchun bizga ishonishingiz kerak?
              </h3>

              <p className="mt-2 sm:mt-4 text-center text-gray-600 font-medium text-sm sm:text-base">
                4 yil ichida minglab o‘quvchilarni tayyorladik, Toshkent bo‘ylab
                filiallar ochdik va kuchli o‘qituvchilar jamoasini yig‘dik.
              </p>

              <div className="mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
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

              <div className="mt-6 sm:mt-10 text-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg border
                       border-gray-300 font-medium text-sm sm:text-base
                       hover:bg-gray-100 transition"
                >
                  Yopish
                </button>
              </div>
            </motion.div>
          </motion.div>
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
    className={`p-3 sm:p-5 rounded-xl ${
      highlight ? "bg-orange-500 text-white" : "border border-gray-200"
    }`}
  >
    <h4 className="text-sm sm:text-xl font-bold">{title}</h4>
    <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium opacity-90">
      {text}
    </p>
  </div>
);

export default Section1;
