import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Astronout } from "../assets";

const Section4 = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <section className="relative py-24 px-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Farzandingizning{" "}
            <span className="text-orange-500">rivojlanayotganini</span> istalgan
            vaqtda ko'rishingiz mumkin
          </h1>

          <div className="mt-10 space-y-6 w-full max-w-md">
            {/* Online platforma */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
              <h4 className="text-xl font-semibold text-orange-400">
                Online platforma
              </h4>
              <p className="mt-3 text-gray-300 text-sm md:text-base">
                Bizda o'quvchilar uchun Space onlayn platformasi mavjud. Shaxsiy
                kabinetda bolalar uy vazifalari, darslarini va to'plangan{" "}
                <span className="text-orange-400 font-medium">coin'lar</span>{" "}
                sonini ko'rishlari mumkin.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 px-8 py-4 rounded-2xl
                         bg-orange-500 text-white font-semibold text-lg
                         hover:bg-orange-600 transition shadow-lg"
            >
              Batafsil
            </button>
          </div>
        </div>

        {/* RIGHT ASTRONAUT */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={Astronout}
            alt="Astronaut"
            className="w-64 md:w-80 lg:w-105 select-none"
          />
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="bg-white text-gray-900 max-w-3xl w-full rounded-2xl p-8 shadow-2xl space-y-6">
                <h1 className="text-3xl font-bold text-center">
                  Farzandingiz haqida oylik hisobot va rejalar
                </h1>

                <div className="p-5 rounded-xl bg-gray-100">
                  <h4 className="text-xl font-semibold text-orange-500">
                    Ikkinchi o'qituvchi
                  </h4>
                  <p className="mt-2 text-gray-700">
                    Professional o'qituvchidan tashqari, yordamchi o'qituvchimiz
                    ham bor. U har doim uy vazifalari, yaxshi tushunilmagan
                    mavzular va o'tkazib yuborilgan{" "}
                    <span className="font-medium text-orange-500">darslarda</span>{" "}
                    yordam beradi.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-gray-100">
                  <h4 className="text-xl font-semibold text-orange-500">
                    Oylik hisobot
                  </h4>
                  <p className="mt-2 text-gray-700">
                    Siz har oyda markazimiz o'qituvchilaridan farzandingiz
                    muvaffaqiyati haqida hisobot olasiz. Shaxsiy kabinetni ham
                    kuzatib borasiz.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-gray-100">
                  <h4 className="text-xl font-semibold text-orange-500">
                    Shaxsiy reja
                  </h4>
                  <p className="mt-2 text-gray-700">
                    Har oyda o'qituvchi sizga keyingi bosqichlar va rivojlanish
                    bo‘yicha{" "}
                    <span className="font-medium text-orange-500">tavsiyalar</span>{" "}
                    beradi.
                  </p>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 rounded-lg border border-gray-300
                               font-medium hover:bg-gray-100 transition"
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

export default Section4;