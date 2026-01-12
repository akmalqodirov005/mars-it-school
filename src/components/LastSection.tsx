import { useState } from "react";
import { motion } from "framer-motion";
import { Astranout } from "../assets";

const LastSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false);

  const BOT_TOKEN = "8054934037:AAGBYyErwpsaSC2iiJ79rbDVUngW-VrBquk";
  const CHAT_ID = "856407175";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const telegramMessage = `
🪐 *Yangi murojaat!*

👤 Ism: ${name}
📞 Telefon: +998 ${phone}
💡 Taklif: ${message || "Yo'q"}
🔗 Telegram: @mars_it_school
    `;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      });

      setName("");
      setPhone("");
      setMessage("");
      alert("✅ Muvaffaqiyatli yuborildi!");
    } catch {
      alert("❌ Xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 py-16 px-4 sm:py-20 sm:px-6 lg:px-8 text-white flex flex-col items-center gap-8">
      {/* Sarlavha */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center max-w-xl leading-snug">
        Hali ham savollaringiz bormi? <br />
        Biz sizga to'g'ri dasturni tanlashda yordam bera olamiz
      </h1>

      {/* Astronaut animatsiyasi */}
      <motion.img
        src={Astranout}
        alt="Astronaut"
        className="w-28 sm:w-40 md:w-60 lg:w-72 select-none"
        animate={{
          y: [0, -15, 0, 15, 0],
          x: [0, 8, 0, -8, 0],
          rotate: [0, 4, 0, -4, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-3 sm:space-y-4 p-0 rounded-2xl"
      >
        {/* Ism */}
        <input
          type="text"
          placeholder="Ismingiz"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl
                     text-white placeholder-gray-400
                     border border-white/20 outline-none
                     focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm sm:text-base transition"
          aria-label="Ismingiz"
        />

        {/* Telefon */}
        <div className="flex items-center gap-2">
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white border border-white/20 select-none text-sm sm:text-base">
            🇺🇿 +998
          </div>
          <input
            type="tel"
            placeholder="90 123 45 67"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            required
            maxLength={9}
            className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl
                       text-white placeholder-gray-400 border border-white/20 outline-none
                       focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm sm:text-base transition"
            aria-label="Telefon raqamingiz"
          />
        </div>

        {/* Taklif / Fikr */}
        <textarea
          placeholder="Taklif yoki fikringizni yozing..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl
                     text-white placeholder-gray-400 border border-white/20 outline-none
                     focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm sm:text-base transition resize-none"
          aria-label="Taklif yoki fikringiz"
        />

        {/* Submit button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-orange-400 text-orange-400 font-semibold
                       hover:bg-orange-400 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? "Yuborilmoqda..." : "Yuborish"}
          </button>
        </div>
      </form>

      {/* Telegram havolasi */}
      <p className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base text-center max-w-md">
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
  );
};

export default LastSection;