import { useState } from "react";

const faqs = [
  {
    q: "O'qish narxi qancha?",
    a: `Kurslarimiz narxi 1.090.000 so'm. Bu mablag' ichiga 12 ta dars,
        o'quvchilar uchun onlayn platforma, bepul Wi-Fi'li co-working zonasi,
        yordamchi o'qituvchi, yakshanba kungi qiziqarli tadbirlar va
        dars payti beriladigan noutbuk kiradi.`,
  },
  {
    q: "Darslar uchun nima talab qilinadi?",
    a: `O'quvchiga noutbuk kerak bo'ladi. Birinchi darsda o'qituvchi
        kerakli dasturlarni o'rnatishga yordam beradi.`,
  },
  {
    q: "Farzandimning noutbuki bo'lmasa-chi?",
    a: "Muammo yo'q, o'quv markazimiz tomonidan noutbuk taqdim etiladi.",
  },
  {
    q: "Darslar yozda bo'ladimi?",
    a: "«Mars IT»da darslar yil davomida bo'ladi.",
  },
  {
    q: "Bola bir haftada hamma narsani tashlab qo'ymaydimi?",
    a: `Yo'q, chunki biz dasturlashni tez va aniq natijalarga ega
        interaktiv o'yinga aylantirdik.`,
  },
  {
    q: "Kurs oxirida farzandim dasturchi bo'ladimi?",
    a: `Bola o'zi xohlagan kasb egasiga aylanadi. Biz IT sohasida
        muvaffaqiyatli faoliyat boshlash uchun barcha bilim va
        ko'nikmalarni taqdim etamiz.
        *Kurs ishga joylashishni kafolatlamaydi.`,
  },
  {
    q: "Kursni tugatgandan keyin sertifikat berasizmi?",
    a: "Ha, biz kursni muvaffaqiyatli tamomlaganlik uchun sertifikat beramiz.",
  },
];

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:py-10 sm:px-6 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 sm:mb-16">
          Ko'p so'raladigan savollar
        </h1>

        {/* FAQ list */}
        <div className="divide-y divide-gray-200 border-t border-b">
          {faqs.map((item, index) => (
            <div key={index} className="py-4 sm:py-6">
              {/* Question row */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                  {item.q}
                </h3>

                <span className="text-xl sm:text-2xl md:text-2xl font-light transition">
                  {activeIndex === index ? "×" : "+"}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-300 ease-in-out
                ${
                  activeIndex === index
                    ? "grid-rows-[1fr] opacity-100 mt-3 sm:mt-4"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="leading-snug text-sm sm:text-base md:text-base">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Questions;