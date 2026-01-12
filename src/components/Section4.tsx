import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Astronout } from "../assets";

const Section4 = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-12 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-center lg:items-start relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Farzandingizning{" "}
            <span className="text-orange-500">rivojlanayotganini</span>{" "}
            istalgan vaqtda ko'rishingiz mumkin
          </h1>

          <div className="mt-6 sm:mt-10 space-y-4 sm:space-y-6 w-full max-w-md">
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
              <h4 className="text-lg sm:text-xl font-semibold text-orange-400">
                Online platforma
              </h4>
              <p className="mt-2 sm:mt-3 text-gray-300 text-sm sm:text-base">
                Bizda o'quvchilar uchun Space onlayn platformasi mavjud.
                Shaxsiy kabinetda bolalar uy vazifalari, darslarini va
                to'plangan{" "}
                <span className="text-orange-400 font-medium">coin'lar</span>{" "}
                sonini ko'rishlari mumkin.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-4 sm:mt-6 px-6 sm:px-8 py-2 sm:py-3 rounded-2xl
                         bg-orange-500 text-white font-semibold text-sm sm:text-lg
                         hover:bg-orange-600 transition shadow-lg"
            >
              Batafsil
            </button>
          </div>

          {/* ===== SECTION ICHIDAGI MODAL ===== */}
          <AnimatePresence>
            {showModal && (
              <>
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowModal(false)}
                />

                {/* Modal */}
                <motion.div
                  className="absolute z-50 left-1/2 top-1/2
                             -translate-x-1/2 -translate-y-1/2
                             w-[90%] max-w-sm
                             bg-white text-gray-900
                             rounded-2xl p-5 sm:p-6 shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-center">
                    Farzandingiz rivoji nazoratda
                  </h3>

                  <div className="grid grid-cols-1 gap-2 mt-4">
                    <MiniCard
                      title="Ikkinchi o‘qituvchi"
                      text="Uy vazifalari va tushunilmagan mavzularda doimiy yordam"
                    />
                    <MiniCard
                      highlight
                      title="Oylik hisobot"
                      text="Har oy farzandingiz natijalari haqida to‘liq ma’lumot"
                    />
                    <MiniCard
                      title="Shaxsiy reja"
                      text="Keyingi rivojlanish bosqichlari bo‘yicha tavsiyalar"
                    />
                  </div>

                  <div className="text-center pt-3">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 rounded-lg border border-gray-300
                                 font-medium text-sm hover:bg-gray-100 transition"
                    >
                      Yopish
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT ASTRONAUT */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={Astronout}
            alt="Astronaut"
            className="w-48 sm:w-64 md:w-80 lg:w-96 select-none"
          />
        </motion.div>
      </div>
    </section>
  );
};

/* ================= MINI CARD ================= */

const MiniCard = ({
  title,
  text,
  highlight = false,
}: {
  title: string;
  text: string;
  highlight?: boolean;
}) => (
  <div
    className={`p-3 rounded-lg ${
      highlight
        ? "bg-orange-500 text-white"
        : "border border-gray-200 bg-gray-50"
    }`}
  >
    <h4 className="text-sm sm:text-base font-semibold">{title}</h4>
    <p className="mt-1 text-xs sm:text-sm opacity-90">{text}</p>
  </div>
);

export default Section4;