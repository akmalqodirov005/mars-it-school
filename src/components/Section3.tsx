const Section3 = () => {
  return (
    <section className="relative py-20 px-4 sm:py-32 sm:px-6 lg:px-12 text-white">
      {/* Section Title */}
      <div className="max-w-3xl sm:max-w-5xl mx-auto text-center mb-12 sm:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide leading-snug sm:leading-tight">
          BIZDA YAGONA, QULAY VA SAMARALI{" "}
          <span className="text-orange-500">TALIM KURSI</span> MAVJUD
        </h1>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
        {/* IT KIDS */}
        <div
          className="relative w-full md:w-1/2 rounded-2xl p-4 sm:p-6 lg:p-8
                     bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800
                     shadow-xl hover:scale-105 transform transition-all duration-300"
        >
          <span className="text-purple-400 font-semibold text-xs sm:text-sm md:text-base">9-11 yosh</span>
          <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-white">IT KIDS</h2>
          <p className="mt-2 text-gray-300 text-xs sm:text-sm md:text-base">
            Robototexnika yordamida IT olamiga ilk qadamlar
          </p>
          <h4 className="mt-4 text-gray-400 text-xs sm:text-sm md:text-sm leading-relaxed">
            Farzandingiz IT'ni o'yin orqali o'rganadi – robotlar yig'adi,
            dasturlaydi va aqlli uylar yaratadi. C++ va Python dasturlash
            tillarini o'zlashtiradi, Arduino bilan ishlashni o'rganadi.
          </h4>
        </div>

        {/* DASTURLASH */}
        <div
          className="relative w-full md:w-1/2 rounded-2xl p-4 sm:p-6 lg:p-8
                     bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800
                     shadow-xl hover:scale-105 transform transition-all duration-300"
        >
          <span className="text-blue-400 font-semibold text-xs sm:text-sm md:text-base">9-11 yosh</span>
          <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-white">DASTURLASH</h2>
          <p className="mt-2 text-gray-300 text-xs sm:text-sm md:text-base">
            Saytlar, botlar va sun'iy intellekt – barchasi bir kursda
          </p>
          <h4 className="mt-4 text-gray-400 text-xs sm:text-sm md:text-sm leading-relaxed">
            Farzandingiz veb-saytlar yaratishni, telegram botlar tuzishni,
            ma'lumotlar bazasi bilan ishlashni va AI'dan foydalanishni
            o'rganadi. JavaScript va Python bilan mustahkam dasturlash bazasini
            shakllantiradi.
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Section3;