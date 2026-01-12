import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Beruniy,
  Chilonzor,
  Mirobod,
  Sergeli,
  Yunusobod,
  Yunusobod2,
} from "../assets";

const BOT_TOKEN = "8054934037:AAGBYyErwpsaSC2iiJ79rbDVUngW-VrBquk";
const CHAT_ID = "856407175";

const branches = [
  { img: Beruniy, title: "1-Filial", text: "Toshkent sh, Beruniy ko'chasi 35A." },
  { img: Yunusobod, title: "2-Filial", text: "Yunusobod tumani, Yangishahar 10." },
  { img: Chilonzor, title: "3-Filial", text: "Chilonzor tumani, 8-kvartal, 2-uy." },
  { img: Chilonzor, title: "4-Filial", text: "Chilonzor tumani, 8-kvartal, 2-uy." },
  { img: Sergeli, title: "5-Filial", text: "Sergeli tumani, Sug'diyona mahallasi." },
  { img: Mirobod, title: "6-Filial", text: "Mirobod tumani, Taras Shevchenko 24." },
  { img: Yunusobod2, title: "7-Filial", text: "Yunusobod tumani, Kiyev massivi 3A." },
];

const Section6 = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = `
🪐 *Yangi murojaat!*

👤 Ism: ${name}
📞 Telefon: +998 ${phone}
🏢 Filial: ${selectedBranch}
`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      setName("");
      setPhone("");
      setSelectedBranch("");
      setActiveIndex(null);
      alert("✅ Muvaffaqiyatli yuborildi!");
    } catch {
      alert("❌ Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 px-5 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Shahar bo'ylab <span className="text-orange-500">7 ta «Mars IT»</span>{" "}
          filiallari
        </h1>

        {/* ===== HORIZONTAL SCROLL KARUSEL ===== */}
        <div className="mt-10 flex gap-4 overflow-x-auto py-5 px-2 snap-x snap-mandatory">
          {branches.map((item, i) => (
            <motion.div
              key={i}
              className="min-w-62.5 snap-center rounded-xl overflow-hidden bg-orange-500/5 border border-orange-400/20 shrink-0"
              whileHover={{ scale: 1.03 }}
            >
              <img src={item.img} className="w-full h-36 object-cover" />

              <div className="p-3 space-y-1 text-left">
                <h3 className="text-md font-semibold text-orange-400">{item.title}</h3>
                <p className="text-gray-300 text-xs truncate">{item.text}</p>

                <button
                  onClick={() => {
                    setActiveIndex(i);
                    setSelectedBranch(item.title);
                  }}
                  className="w-full mt-2 py-2 rounded-lg bg-orange-500 text-sm font-semibold"
                >
                  Ekskursiyaga yozilish
                </button>
              </div>

              {/* ===== CARD ICHIDAGI MODAL ===== */}
              <AnimatePresence>
                {activeIndex === i && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-black/70 z-40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setActiveIndex(null)}
                    />

                    <motion.div
                      className="absolute z-50 left-1/2 top-1/2
                                 -translate-x-1/2 -translate-y-1/2
                                 w-[90%] max-w-sm
                                 bg-black border border-orange-400
                                 rounded-2xl p-5"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h2 className="text-xl font-bold text-center mb-4">
                        🪐 Ekskursiyaga yozilish
                      </h2>

                      <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Ism"
                          className="w-full px-3 py-2 rounded bg-black border border-orange-400/50 text-sm"
                        />

                        <div className="flex gap-2">
                          <span className="px-3 py-2 border border-orange-400/50 rounded text-sm">
                            +998
                          </span>
                          <input
                            value={phone}
                            onChange={(e) =>
                              setPhone(e.target.value.replace(/\D/g, ""))
                            }
                            maxLength={9}
                            required
                            placeholder="XX XXX XX XX"
                            className="flex-1 px-3 py-2 rounded bg-black border border-orange-400/50 text-sm"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-2 bg-orange-400 text-black rounded-lg font-semibold text-sm"
                        >
                          {loading ? "Yuborilmoqda..." : "Jo'natish"}
                        </button>
                      </form>

                      <button
                        onClick={() => setActiveIndex(null)}
                        className="mt-3 w-full text-xs opacity-80 hover:opacity-100"
                      >
                        Yopish
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section6;