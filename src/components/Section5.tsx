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

  const cardStyle =
    "relative p-4 md:p-5 rounded-2xl border border-orange-400/40 " +
    "bg-orange-500/10 backdrop-blur-sm text-white text-center space-y-2 " +
    "transition-all duration-300 hover:bg-orange-500/15";

  const buttonStyle =
    "mt-4 px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-orange-500/90 " +
    "hover:bg-orange-500 transition-colors duration-300 text-sm md:text-base font-medium";

  return (
    <section className="relative py-24 px-4 md:px-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 md:mb-20">
          O'quv maktabimiz asoschilari{" "}
          <span className="text-orange-500">ta'lim sohasidagi</span> tajribali
          tadbirkorlardir
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-center">
          {/* Jahongir */}
          <motion.div
            className="flex flex-col items-center space-y-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className={cardStyle}>
              <p className="text-sm md:text-base">"Cambridge LC" Training Center</p>
              <p className="text-sm md:text-base">Modme IT company</p>
              <p className="text-sm md:text-base">Mars IT school</p>

              <button
                className={buttonStyle}
                onClick={() => setActivePerson("jahongir")}
              >
                Batafsil
              </button>
            </div>

            <img
              src={Teacher1}
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover"
            />
            <h2 className="text-lg md:text-xl font-semibold">Jahongir Po'latov</h2>
          </motion.div>

          {/* Atxam */}
          <motion.div
            className="flex flex-col items-center space-y-4"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <h2 className="text-lg md:text-xl font-semibold">Atxam Shaisayev</h2>

            <img
              src={Teacher2}
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover"
            />

            <div className={cardStyle}>
              <p className="text-sm md:text-base">PM "Chopar Pizza"</p>
              <p className="text-sm md:text-base">CEO "Get coffee"</p>
              <p className="text-sm md:text-base">CEO "Mars IT school"</p>

              <button
                className={buttonStyle}
                onClick={() => setActivePerson("atxam")}
              >
                Batafsil
              </button>
            </div>
          </motion.div>

          {/* Ruslan */}
          <motion.div
            className="flex flex-col items-center space-y-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className={cardStyle}>
              <p className="text-sm md:text-base">Direktor Mars IT school</p>
              <p className="text-sm md:text-base">Modme asoschisi</p>

              <button
                className={buttonStyle}
                onClick={() => setActivePerson("ruslan")}
              >
                Batafsil
              </button>
            </div>

            <img
              src={Teacher3}
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover"
            />
            <h2 className="text-lg md:text-xl font-semibold">Ruslan Yo'ldoshev</h2>
          </motion.div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activePerson && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-white text-gray-900 max-w-3xl w-full rounded-2xl p-6 md:p-10 shadow-2xl max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => setActivePerson(null)}
                className="absolute top-4 md:top-5 right-4 md:right-6 text-2xl md:text-3xl opacity-70 hover:opacity-100"
              >
                ✕
              </button>

              {activePerson === "jahongir" && (
                <>
                  <img
                    src={Jahongir}
                    className="w-40 h-40 md:w-52 md:h-52 mx-auto rounded-full mb-6 object-cover"
                  />
                  <h2 className="text-2xl md:text-3xl font-bold text-center">
                    Jahongir Po'latov
                  </h2>
                  <p className="mt-4 text-center text-gray-700 leading-relaxed text-sm md:text-base">
                    Jahongir Po‘latov haqida qisqacha, faqat IT/ta’lim faoliyati:
                    • Mars IT School – Jahongirning IT ta’lim markazi, dasturlash
                    va IT ko‘nikmalarini o‘rgatadi. • Modme – EdTech startap,
                    ta’lim markazlari uchun CRM tizimi, dars va to‘lovlarni
                    boshqaradi. • Cambridge Learning Center / Kidzzz – Ta’lim
                    markazlari, zamonaviy metodlar va IT integratsiyalari bilan
                    bolalar va kattalarni o‘qitadi. • Jahon School – Innovatsion
                    ta’lim loyihasi, IT ko‘nikmalarini o‘quv jarayoniga qo‘shadi.
                  </p>
                </>
              )}

              {activePerson === "atxam" && (
                <>
                  <img
                    src={Atxam}
                    className="w-40 h-40 md:w-52 md:h-52 mx-auto rounded-full mb-6 object-cover"
                  />
                  <h2 className="text-2xl md:text-3xl font-bold text-center">
                    Atxam Shaisayev
                  </h2>
                  <p className="mt-4 text-center text-gray-700 leading-relaxed text-sm md:text-base">
                    Atxam Shaisayev haqida qisqacha, faqat IT/ta’lim faoliyati: •
                    Mars IT School – Atxamning IT ta’lim markazi, bolalar va
                    yoshlar uchun dasturlash va IT ko‘nikmalarini o‘rgatadi. •
                    Ta’lim loyihalarini boshqarish – IT va ta’lim sohasidagi turli
                    loyihalarni tashkil qiladi va rivojlantiradi.
                  </p>
                </>
              )}

              {activePerson === "ruslan" && (
                <>
                  <img
                    src={Ruslan}
                    className="w-40 h-40 md:w-52 md:h-52 mx-auto rounded-full mb-6 object-cover"
                  />
                  <h2 className="text-2xl md:text-3xl font-bold text-center">
                    Ruslan Yo'ldoshev
                  </h2>
                  <p className="mt-4 text-center text-gray-700 leading-relaxed text-sm md:text-base">
                    Ruslan Yo‘ldoshev haqida qisqacha, faqat IT/ta’lim faoliyati:
                    • Mars IT School – Ruslan Mars IT School asoschilaridan biri
                    va CTO (texnik direktor) bo‘lib, bu maktabda dasturlash va IT
                    bo‘yicha bilimlar tashkil etiladi. • Modme – U Modme EdTech
                    startapining texnik direktori va asoschilardan biri; bu
                    platforma ta’lim markazlari uchun CRM tizimini yaratadi va
                    darslar hamda to‘lovlarni boshqarishni osonlashtiradi.
                  </p>
                </>
              )}

              <div className="mt-8 text-center">
                <button
                  onClick={() => setActivePerson(null)}
                  className="px-6 py-2 rounded-lg border border-gray-300
                             font-medium hover:bg-gray-100 transition"
                >
                  Yopish
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Section5;