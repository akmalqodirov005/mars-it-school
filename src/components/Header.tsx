import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MarsLogoWhite } from "../assets";

const BOT_TOKEN = "8054934037:AAGBYyErwpsaSC2iiJ79rbDVUngW-VrBquk";
const CHAT_ID = "856407175";

interface HeaderProps {
  onMusic: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMusic }) => {
  const [isMuted, setIsMuted] = useState(!onMusic);
  const [bars, setBars] = useState<number[]>(new Array(8).fill(4));
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleMusic = () => setIsMuted((p) => !p);

  // 🔹 Bars animation faqat desktop headerda ishlaydi va menu ochilganda to‘xtaydi
  useEffect(() => {
    if (!isMuted && !showMenu) {
      const interval = setInterval(() => {
        setBars(Array.from({ length: 8 }, () => Math.random() * 14 + 2));
      }, 120);
      return () => clearInterval(interval);
    } else {
      // Menu ochilganda yoki music muted bo‘lganda bars reset qilinadi
      setBars(new Array(8).fill(4));
    }
  }, [isMuted, showMenu]);

  // 🔹 Telegramga ariza yuborish
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = `🪐 *Yangi murojaat!*\n\n👤 Ism: ${name}\n📞 Telefon: +998 ${phone}`;

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
      setShowModal(false);
      alert("✅ Yuborildi!");
    } catch {
      alert("❌ Xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ========================= HEADER ========================= */}
      <AnimatePresence>
        {!showMenu && (
          <motion.header
            className="fixed top-3 left-0 right-0 z-50"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* 🔹 Audio faqat desktop headerda ishlaydi */}
            <audio autoPlay loop muted={isMuted} src="/space-music.mp3" />

            <div className="container mx-auto flex items-center justify-between px-4 h-16 bg-black/70 backdrop-blur-md rounded-2xl">
              <img src={MarsLogoWhite} className="w-28 select-none" alt="Mars Logo" />

              {/* ========================= DESKTOP ========================= */}
              <div className="hidden md:flex items-center gap-6 z-10 relative">
                <a
                  href="tel:+998787777757"
                  className="text-white hover:text-orange-400 transition-colors duration-200"
                >
                  📞 +998 (78) 777-77-57
                </a>

                {/* 🔹 Music bars */}
                <button
                  onClick={toggleMusic}
                  className="flex gap-1 items-end h-5"
                  aria-label="Toggle music"
                >
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      className={`w-0.5 ${isMuted ? "bg-white" : "bg-orange-400"}`}
                      animate={{ height: h }}
                      transition={{ duration: 0.12 }}
                    />
                  ))}
                </button>

                {/* 🔹 Ariza button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="border border-orange-400 text-orange-400 px-4 py-2 rounded-lg hover:bg-orange-400 hover:text-black transition-all duration-200"
                >
                  Ariza
                </button>
              </div>

              {/* ========================= MOBILE MENU BUTTON ========================= */}
              <button
                onClick={() => setShowMenu(true)}
                className="md:hidden text-white text-2xl hover:text-orange-400 transition-colors duration-200"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ========================= FULLSCREEN MOBILE MENU ========================= */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowMenu(false)}
            />

            <motion.div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white gap-8 p-6"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.img
                src={MarsLogoWhite}
                className="w-40 mb-4"
                alt="Mars Logo"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              />

              <motion.a
                href="tel:+998787777757"
                className="text-xl hover:text-orange-400 transition-colors duration-200"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                📞 +998 (78) 777-77-57
              </motion.a>

              <motion.button
                onClick={() => {
                  setShowMenu(false);
                  setTimeout(() => setShowModal(true), 300);
                }}
                className="mt-4 border-2 border-orange-400 px-8 py-3 rounded-xl text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-200 hover:scale-105"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                Ariza yuborish
              </motion.button>

              <motion.button
                onClick={() => setShowMenu(false)}
                className="absolute top-8 right-8 text-4xl hover:text-orange-400 hover:rotate-90 transition-all duration-300"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
              >
                ✕
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========================= MODAL ========================= */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />

            <motion.div
              className="fixed inset-0 z-70 flex items-center justify-center p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-liniar-to-br from-gray-900 to-black border-2 border-orange-400 rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
                {/* Close button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-white hover:text-orange-400 text-2xl transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  🪐 Ariza yuborish
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-orange-400/50 focus:border-orange-400 outline-none transition-colors"
                      placeholder="Ism"
                    />
                  </div>

                  <div>
                    <div className="flex gap-2">
                      <span className="px-4 py-2 bg-black/50 border border-orange-400/50 rounded-lg text-white">
                        +998
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        required
                        maxLength={9}
                        className="flex-1 px-4 py-2 rounded-lg bg-black/50 text-white border border-orange-400/50 focus:border-orange-400 outline-none transition-colors"
                        placeholder="XX XXX XX XX"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Yuborilmoqda..." : "Yuborish"}
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
    </>
  );
};

export default Header;