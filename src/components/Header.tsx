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

  // Bars animation
  useEffect(() => {
    if (!isMuted && !showMenu) {
      const interval = setInterval(() => {
        setBars((prev) =>
          prev.map((h) => Math.max(2, Math.min(16, h + (Math.random() - 0.5) * 4)))
        );
      }, 300);
      return () => clearInterval(interval);
    } else {
      setBars(new Array(8).fill(4));
    }
  }, [isMuted, showMenu]);

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
      {/* ================= HEADER ================= */}
      <AnimatePresence>
        {!showMenu && (
          <motion.header
            className="fixed top-3 left-0 right-0 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <audio autoPlay loop muted={isMuted} src="/space-music.mp3" />

            <div className="container mx-auto flex items-center justify-between px-4 h-16 bg-black/70 backdrop-blur-md rounded-2xl shadow-lg">
              <img src={MarsLogoWhite} className="w-35 select-none" alt="Mars Logo" />

              {/* Desktop */}
              <div className="hidden md:flex items-center gap-6 z-10 relative">
                <a
                  href="tel:+998787777757"
                  className="text-white hover:text-orange-400 transition-colors duration-300"
                >
                  📞 +998 (78) 777-77-57
                </a>

                {/* Music bars */}
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
                      transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                        mass: 0.3,
                      }}
                    />
                  ))}
                </button>

                {/* Ariza button */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(255,165,0,0.7)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(true)}
                  className="border border-orange-400 text-orange-400 px-4 py-2 rounded-lg hover:bg-orange-400 hover:text-black transition-all duration-300"
                >
                  Ariza
                </motion.button>
              </div>

              {/* Mobile */}
              <div className="flex md:hidden items-center gap-4">
                <button
                  onClick={toggleMusic}
                  className="flex gap-0.5 items-end h-4"
                  aria-label="Toggle music"
                >
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      className={`w-0.5 ${isMuted ? "bg-white" : "bg-orange-400"}`}
                      animate={{ height: h / 2 }}
                      transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                        mass: 0.3,
                      }}
                    />
                  ))}
                </button>

                <button
                  onClick={() => setShowMenu(true)}
                  className="text-white text-2xl hover:text-orange-400 transition-colors duration-300"
                  aria-label="Open menu"
                >
                  ☰
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-xl p-6 pt-24 gap-6"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <button
              onClick={() => setShowMenu(false)}
              className="absolute top-6 right-6 text-3xl text-white hover:text-orange-400 transition-all duration-300"
            >
              ✕
            </button>

            <img
              src={MarsLogoWhite}
              className="w-36 mx-auto mb-6"
              alt="Mars Logo"
            />

            <a
              href="tel:+998787777757"
              className="text-lg text-white hover:text-orange-400 text-center transition-colors duration-300"
            >
              📞 +998 (78) 777-77-57
            </a>

            <motion.button
              onClick={() => {
                setShowMenu(false);
                setTimeout(() => setShowModal(true), 300);
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(255,165,0,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="mx-auto w-full max-w-xs py-3 bg-transparent border-2 border-orange-400 text-orange-400 font-semibold rounded-lg hover:bg-orange-400 hover:text-black transition-all duration-300"
            >
              Ariza yuborish
            </motion.button>

            <a
              href="https://t.me/mars_it_school"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-orange-400 hover:underline mt-4"
            >
              @mars_it_school
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={() => setShowModal(false)}
            />

            <motion.div
              className="fixed inset-0 z-70 flex items-center justify-center p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-liniar-to-br from-gray-900 to-black border-2 border-orange-400 rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-white hover:text-orange-400 text-2xl transition-colors"
                >
                  ✕
                </button>

                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  🪐 Ariza yuborish
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-orange-400/50 focus:border-orange-400 outline-none transition-all duration-300"
                      placeholder="Ism"
                    />
                  </div>

                  <div className="flex gap-2 sm:gap-4 w-full">
  <span className="shrink-0 px-4 py-2 bg-black/50 border border-orange-400/50 rounded-lg text-white text-sm sm:text-base">
    +998
  </span>
  <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
    required
    maxLength={9}
    className="flex-1 min-w-0 px-4 py-2 rounded-lg bg-black/50 text-white border border-orange-400/50 focus:border-orange-400 outline-none text-sm sm:text-base transition-all duration-300"
    placeholder="XX XXX XX XX"
  />
</div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Yuborilmoqda..." : "Yuborish"}
                  </button>
                </form>

                <p className="mt-4 text-gray-400 text-sm text-center">
                  Agar savollaringiz bo‘lsa, murojaat qilishingiz mumkin:{" "}
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