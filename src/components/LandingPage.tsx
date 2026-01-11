import React, { useState } from "react";
import Typewriter from "typewriter-effect";

interface Props {
  onEnter: () => void;
  onContinue: () => void;
}

const LandingPage: React.FC<Props> = ({ onEnter, onContinue }) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden px-4">
      
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,50,0.18),transparent_65%)]" />

      <div className="relative z-10 text-center w-full max-w-xl">
        
        {/* Text */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-gray-900 min-h-14">
          <Typewriter
            options={{
              delay: 50,
              cursor: "|",
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  '<span style="color:#FF6A00;font-weight:600;">Mars IT School</span>'
                )
                .typeString(" ga hush kelibsiz")
                .pauseFor(600)
                .callFunction(() => setShowButton(true))
                .start();
            }}
          />
        </h2>

        {/* Button wrapper – JOY OLDINDAN BAND */}
        <div className="mt-10 min-h-16 flex justify-center">
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-500
              ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
            `}
          >
            <button
              onClick={onEnter}
              className="px-8 py-3 rounded-xl bg-orange-500 text-white font-medium
                         shadow-md hover:bg-orange-600 hover:shadow-lg
                         transition-all duration-300"
            >
              Davom ettirish
            </button>

            <button
              onClick={onContinue}
              className="px-8 py-3 rounded-xl border border-orange-300
                         text-orange-600 font-medium
                         hover:bg-orange-50 transition-all duration-300"
            >
              Musiqasiz davom ettirish
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;