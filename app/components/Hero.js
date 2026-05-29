"use client";

import { useState } from "react";

export default function Hero({ onOpen }) {
  const [paperUnlocked, setPaperUnlocked] = useState(false);

  return (
    <div className="min-h-screen w-full bg-pink-200 flex items-center justify-center overflow-x-hidden relative px-4 py-10">
      <style jsx>{`
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .typing-line {
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          animation: typing 2s steps(45) forwards;
        }
      `}</style>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* LEFT PAPER */}
        <div className="relative w-[310px] sm:w-[380px] lg:w-[420px] min-h-[420px] lg:min-h-[480px] bg-[#f4e6c8] p-7 lg:p-10 shadow-2xl border-4 border-[#d2b47c] rotate-[-3deg] lg:rotate-[-5deg] rounded-[45%_55%_50%_50%]">
          <div className="absolute -top-5 -left-5 w-24 lg:w-32 h-8 lg:h-10 bg-[#c7a06d] rotate-[-25deg] rounded-sm"></div>
          <div className="absolute -bottom-5 -right-5 w-28 lg:w-36 h-8 lg:h-10 bg-[#c7a06d] rotate-[-25deg] rounded-sm"></div>

          {!paperUnlocked ? (
            <div className="min-h-[360px] lg:min-h-[400px] flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl lg:text-4xl font-serif text-pink-700 mb-6">
                Secret Paper 💌
              </h2>

              <p className="text-gray-700 mb-8 text-base lg:text-lg">
                Happy Porantha day my dear Thankapulla
              </p>

              <button
                onClick={() => setPaperUnlocked(true)}
                className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-lg"
              >
                Unlock 🔐
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-pink-700 mb-6 text-center">
                Our Love Story 💌
              </h2>

              <div className="text-gray-800 text-sm sm:text-base lg:text-lg leading-7 lg:leading-8 font-serif space-y-2">
                <p className="typing-line">Nee en life la vandha naal irunthu,</p>
                <p className="typing-line" style={{ animationDelay: "2s" }}>
                  enoda world beautiful aayiduchu.
                </p>
                <p className="typing-line" style={{ animationDelay: "4s" }}>
                  Un smile, un care, un love ellame
                </p>
                <p className="typing-line" style={{ animationDelay: "6s" }}>
                  enakku romba precious da.
                </p>
                <p className="typing-line" style={{ animationDelay: "8s" }}>
                  Happy Birthday my paddukuddy.
                </p>
                <p className="typing-line" style={{ animationDelay: "10s" }}>
                  Nee en ujir ulakam. I love you forever ❤️
                </p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT ENVELOPE */}
        <div className="flex flex-col items-center text-center w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-8 font-serif drop-shadow-[0_0_12px_#ff2b91]">
            Happy Birthday 💖
          </h1>

          <img
            src="/envelope.png"
            className="w-[290px] sm:w-[380px] lg:w-[520px] max-w-full cursor-pointer hover:scale-105 transition duration-300 drop-shadow-2xl"
            onClick={onOpen}
          />

          <p className="mt-5 text-pink-700 font-bold">
            Click the seal to open 💌
          </p>
        </div>
      </div>
    </div>
  );
}