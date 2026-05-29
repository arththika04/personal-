"use client";

import { useRef, useState } from "react";

import Hero from "./components/Hero";
import Message from "./components/Message";
import Surprise from "./components/Surprise";

export default function Home() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [toast, setToast] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const correctPassword = "0414";

  const loveWords = [
    "Happy Birthday Mine 💖",
    "Love you paddu 😘",
    "You are mine ❤️",
    "My favorite person 🌙",
    "Forever yours 💍",
    "My happiness 🥺",
    "My baby 💕",
    "I love you so much 💘",
    "You are my world 🌎",
    "My everything ✨",
    "My love 💗",
    "Only you 🫶",
  ];

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleNumber = (num: string) => {
    playMusic();

    if (password.length < 4) {
      setPassword(password + num);
    }
  };

  const checkPassword = () => {
    if (password === correctPassword) {
      stopMusic();
      setUnlocked(true);
    } else {
      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 2500);

      setPassword("");
    }
  };

  const clearPassword = () => {
    setPassword("");
  };

  return (
    <main>
      <style jsx>{`
        @keyframes loveFall {
          0% {
            transform: translateY(-120px);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }

        .love-fall {
          animation-name: loveFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {/* SONG */}
      <audio ref={audioRef} loop className="hidden">
        <source src="/song.mp3" type="audio/mp3" />
      </audio>

      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-xl shadow-xl z-50">
          You are not the correct person ❌
        </div>
      )}

      {!unlocked ? (
        <div className="h-screen w-full bg-[#fff7df] flex flex-col items-center justify-center overflow-hidden px-4 relative">
          {/* FALLING LOVE WORDS */}
          {loveWords.map((word, index) => (
            <div
              key={index}
              className="absolute text-pink-600 font-extrabold text-xl md:text-3xl drop-shadow-[0_0_8px_#ff4fb3] love-fall"
              style={{
                left: `${5 + (index * 8) % 85}%`,
                top: "-80px",
                animationDuration: `${6 + (index % 4)}s`,
                animationDelay: `${index * 0.8}s`,
              }}
            >
              {word}
            </div>
          ))}

          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-12 text-center drop-shadow-[0_0_14px_#ff4fb3] z-10">
            made a digital gift for birthday
          </h1>

          <div className="relative bg-pink-200 w-[410px] md:w-[560px] p-8 rounded-sm shadow-2xl z-10">
            <div className="absolute top-5 left-0 w-full h-[2px] bg-pink-100"></div>

            <div className="flex items-center justify-between gap-8 pt-8">
              <div className="relative flex items-center justify-center w-44 h-44">
                <div className="absolute w-44 h-44 border-[7px] border-dashed border-pink-600 rounded-full animate-spin"></div>

                <img
                  src="/couple.jpg"
                  className="w-36 h-36 rounded-full object-cover border-4 border-white z-10"
                />
              </div>

              <div className="flex-1">
                <div className="bg-white rounded-xl h-14 flex items-center justify-center text-3xl tracking-[10px] mb-5 text-pink-600">
                  {password.replace(/./g, "•")}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleNumber(num.toString())}
                      className="bg-white h-16 rounded-xl text-pink-600 text-xl font-bold hover:scale-105 transition"
                    >
                      {num}
                    </button>
                  ))}

                  <button
                    onClick={clearPassword}
                    className="bg-pink-400 h-16 rounded-xl text-white font-bold"
                  >
                    C
                  </button>

                  <button
                    onClick={() => handleNumber("0")}
                    className="bg-white h-16 rounded-xl text-pink-600 text-xl font-bold"
                  >
                    0
                  </button>

                  <button
                    onClick={checkPassword}
                    className="bg-pink-600 text-white h-16 rounded-xl font-bold"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-pink-600 italic text-3xl font-serif z-10">
            life
          </p>
        </div>
      ) : (
        <>
          {!envelopeOpened ? (
            <Hero onOpen={() => setEnvelopeOpened(true)} />
          ) : (
            <>
              <Message />
              <Surprise onBack={() => setEnvelopeOpened(false)} />
            </>
          )}
        </>
      )}
    </main>
  );
}