const Section3 = () => {
  return (
    <section className="relative conatiner py-24 px-6 text-white">
      {/* Section Title */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide leading-tight">
          BIZDA YAGONA, QULAY VA SAMARALI{" "}
          <span className="text-orange-500"> TALIM KURSI </span>
          MAVJUD
        </h1>
      </div>

      {/* Cards */}
      <div className="max-w-6xl conatiner mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* IT KIDS */}
        <div
          className="relative w-full md:w-[48%] rounded-2xl p-8 
                  bg-linear-to-br from-gray-900 via-blue-900 to-gray-800
                  shadow-2xl hover:scale-105 transform transition-all duration-300"
        >
          <span className="text-purple-400 font-semibold">9-11 yosh</span>
          <h2 className="mt-2 text-2xl font-bold text-white">IT KIDS</h2>
          <p className="mt-2 text-gray-300">
            Robototexnika yordamida IT olamiga ilk qadamlar
          </p>
          <h4 className="mt-4 text-gray-400 text-sm md:text-base">
            Farzandingiz IT'ni o'yin orqali o'rganadi – robotlar yig'adi,
            dasturlaydi va aqlli uylar yaratadi. C++ va Python dasturlash
            tillarini o'zlashtiradi, Arduino bilan ishlashni o'rganadi.
          </h4>
        </div>

        {/* DASTURLASH */}
        <div
          className="relative w-full md:w-[48%] rounded-2xl p-8 
                  bg-linear-to-br from-gray-900 via-indigo-900 to-gray-800
                  shadow-2xl hover:scale-105 transform transition-all duration-300"
        >
          <span className="text-blue-400 font-semibold">9-11 yosh</span>
          <h2 className="mt-2 text-2xl font-bold text-white">DASTURLASH</h2>
          <p className="mt-2 text-gray-300">
            Saytlar, botlar va sun'iy intellekt – barchasi bir kursda
          </p>
          <h4 className="mt-4 text-gray-400 text-sm md:text-base">
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
