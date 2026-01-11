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
  {
    img: Beruniy,
    title: "1-Filial",
    text: "Toshkent sh, Beruniy ko'chasi 35A.",
  },
  {
    img: Yunusobod,
    title: "2-Filial",
    text: "Yunusobod tumani, Yangishahar 10.",
  },
  {
    img: Chilonzor,
    title: "3-Filial",
    text: "Chilonzor tumani, 8-kvartal, 2-uy.",
  },
  {
    img: Chilonzor,
    title: "4-Filial",
    text: "Chilonzor tumani, 8-kvartal, 2-uy.",
  },
  {
    img: Sergeli,
    title: "5-Filial",
    text: "Sergeli tumani, Sug'diyona mahallasi.",
  },
  {
    img: Mirobod,
    title: "6-Filial",
    text: "Mirobod tumani, Taras Shevchenko 24.",
  },
  {
    img: Yunusobod2,
    title: "7-Filial",
    text: "Yunusobod tumani, Kiyev massivi 3A.",
  },
];

const Section6 = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const message = `
🪐 *Yangi murojaat!*

👤 Ism: ${name}
📞 Telefon: +998 ${phone}
🏢 Filial: ${selectedBranch || "Tanlanmagan"}
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
      alert("✅ Muvaffaqiyatli yuborildi!");
      setShowModal(false);
    } catch {
      alert("❌ Xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 px-5 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Shahar bo'ylab <span className="text-orange-500">7 ta «Mars IT»</span>{" "}
          filiallari
        </h1>
        <p className="mt-5 text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
          Sizga eng yaqin filialni tanlang va{" "}
          <span className="text-orange-400">
            ekskursiya hamda sinov darsiga yoziling
          </span>
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-orange-500/5 border border-orange-400/20 transition duration-300 hover:-translate-y-1 hover:border-orange-400/40"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 text-left space-y-3">
                <h3 className="text-lg font-semibold text-orange-400">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.text}
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full mt-4 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                >
                  Ekskursiyaga yozilish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
<AnimatePresence>
  {showModal && (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 z-110 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowModal(false)}
      />

      {/* Modal content */}
      <motion.div
        className="fixed inset-0 z-111 flex items-center justify-center p-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-liniar-to-br from-gray-900 to-black border-2 border-orange-400 rounded-2xl p-6 sm:p-8 w-full max-w-md relative shadow-2xl backdrop-blur-sm">
          {/* Close button */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-white hover:text-orange-400 text-2xl transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
            🪐 Ekskursiyaga yozilish
          </h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Ma’lumotlaringizni to‘ldiring
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ism"
                className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-orange-400/50 focus:border-orange-400 outline-none transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-black/50 border border-orange-400/50 rounded-lg text-white select-none">
                  +998
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  required
                  maxLength={9}
                  placeholder="XX XXX XX XX"
                  className="flex-1 px-4 py-2 rounded-lg bg-black/50 text-white border border-orange-400/50 focus:border-orange-400 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Filial dropdown */}
            <div>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-orange-400/50 focus:border-orange-400 outline-none transition-colors"
              >
                <option value="">Filialni tanlang</option>
                {branches.map((branch, idx) => (
                  <option key={idx} value={branch.title}>
                    {branch.title} — {branch.text}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Yuborilmoqda..." : "Jo'natish"}
            </button>
          </form>

          {/* Telegram link */}
          <p className="mt-4 text-gray-400 text-sm text-center">
            Agar yana savollaringiz bo‘lsa, murojaat qilishingiz mumkin:{" "}
            <a
              href="https://t.me/mars_it_school"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline"
            >
              @mars_it_school
            </a>
          </p>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </section>
  );
};

export default Section6;