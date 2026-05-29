"use client";

import { useState } from "react";

export default function Surprise({ onBack }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const [birthdayUnlocked, setBirthdayUnlocked] = useState(false);
  const [marryAnswer, setMarryAnswer] = useState("");
  const [showCake, setShowCake] = useState(false);

  const [secretOpened, setSecretOpened] = useState(false);
  const [showTreasure, setShowTreasure] = useState(false);
  const [huntStep, setHuntStep] = useState(0);
  const [huntAnswer, setHuntAnswer] = useState("");
  const [huntError, setHuntError] = useState("");

  const [quizAnswers, setQuizAnswers] = useState({
    firstMeet: "",
    firstCall: "",
    favoriteFood: "",
    nickName: "",
  });

  const [quizPassed, setQuizPassed] = useState(false);
  const [quizError, setQuizError] = useState("");

  const [puzzlePieces, setPuzzlePieces] = useState([3, 0, 2, 6, 4, 1, 7, 5, 8]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  const albumPages = [
    { img: "/album1.jpg", text: "Happy Birthday da my love ❤️ first enakku nee yaar nu kooda therija unmajilaje ithu kadavul da seijal ah ennanu vilankave illa. Insta la paatham kathachcham first our meet insta. Enakku rompa pidichcha person ah nee maarite pona. Sorry di thanka paddu ❤️ Nee en life la vandha aprm ellame beautiful aayiduchu." },
    { img: "/album2.jpg", text: "Un smile paatha pothum enakku full day happy ah irukkum 🥺💕" },
    { img: "/album3.jpg", text: "Nee enakku romba special. Enoda favorite person nee thaan da 💖" },
    { img: "/album4.jpg", text: "Un kooda irukkira every moment enakku precious memory madhiri ✨" },
    { img: "/album5.jpg", text: "Nee happy ah irukkanum. Un dreams ellam true aaganum 🎂" },
    { img: "/album6.jpg", text: "Nee en peace, en happiness, en ujir ulakam 🌍💕" },
    { img: "/album7.jpg", text: "Thank you for loving me and staying with me always 💍 I love you forever 💘" },
  ];

  const cards = [
    { title: "Love Story", image: "/card1.jpg", type: "album" },
    { title: "Birthday Wish", image: "/card2.jpg" },
    { title: "Images", image: "/card3.jpg", content: "Our beautiful memories together 📸💕" },
    { title: "Game", image: "/card4.jpg", type: "game" },
    { title: "Secret Letter", image: "/card5.jpg" },
  ];

  const clues = [
    {
      title: "First Gift 🎁",
      text: "Paddumani ❤️ naan unakkaga first gift hide pannirukken. Bed pillow keela poi paaru 👀💕",
      answer: "yes",
    },
    {
      title: "Second Gift 💌",
      text: "Super da 😍 first gift kandupidichitta! Ippo cupboard oda left drawer open pannu ❤️",
      answer: "yes",
    },
    {
      title: "Final Surprise 🎂",
      text: "Last gift table mela irukkira small cover kulla irukku. Poi paaru my love 🎁💕",
      answer: "yes",
    },
  ];

  const resetPuzzle = () => {
    setPuzzlePieces([3, 0, 2, 6, 4, 1, 7, 5, 8]);
    setSelectedPiece(null);
    setPuzzleSolved(false);
  };

  const openCard = (card) => {
    setSelectedCard(card);
    setPage(0);
    setQuizPassed(false);
    setQuizError("");
    setBirthdayUnlocked(false);
    setMarryAnswer("");
    setShowCake(false);
    setSecretOpened(false);
    setShowTreasure(false);
    setHuntStep(0);
    setHuntAnswer("");
    setHuntError("");
    setQuizAnswers({ firstMeet: "", firstCall: "", favoriteFood: "", nickName: "" });
    resetPuzzle();
  };

  const normalize = (value) => value.toLowerCase().trim().replace(/\s+/g, " ");

  const checkQuiz = () => {
    const ok =
      normalize(quizAnswers.firstMeet) === "vanni in resturant" &&
      normalize(quizAnswers.firstCall) === "nakathampiran kovil" &&
      normalize(quizAnswers.favoriteFood).length > 0 &&
      normalize(quizAnswers.nickName) === "mine diary";

    ok ? setQuizPassed(true) : setQuizError("Konjam yosichu correct answer podu da 😭💕");
  };

  const checkHunt = () => {
    if (normalize(huntAnswer) === clues[huntStep].answer) {
      setHuntError("");
      setHuntAnswer("");

      if (huntStep < clues.length - 1) {
        setHuntStep(huntStep + 1);
      } else {
        setShowCake(true);
      }
    } else {
      setHuntError("Gift kandupidicha aprm yes type pannu 🥺💕");
    }
  };

  const handlePuzzleClick = (index) => {
    if (puzzleSolved) return;
    if (selectedPiece === null) return setSelectedPiece(index);

    const newPieces = [...puzzlePieces];
    [newPieces[selectedPiece], newPieces[index]] = [
      newPieces[index],
      newPieces[selectedPiece],
    ];

    setPuzzlePieces(newPieces);
    setSelectedPiece(null);

    if (newPieces.every((piece, i) => piece === i)) {
      setTimeout(() => setPuzzleSolved(true), 400);
    }
  };

  const nextPage = () => {
    if (page >= albumPages.length - 1 || flipping) return;
    setFlipping(true);
    setTimeout(() => setPage((prev) => prev + 1), 250);
    setTimeout(() => setFlipping(false), 650);
  };

  const prevPage = (e) => {
    e.stopPropagation();
    if (page <= 0 || flipping) return;
    setFlipping(true);
    setTimeout(() => setPage((prev) => prev - 1), 250);
    setTimeout(() => setFlipping(false), 650);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#090008] overflow-hidden flex flex-col items-center justify-center px-4 py-8 text-white">
      <style jsx>{`
        @keyframes flipPage {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(-180deg); }
        }

        .flip-page {
          animation: flipPage 0.65s ease-in-out;
          transform-origin: left center;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#5a002d_0%,#160010_45%,#050005_100%)]"></div>

      <button
        onClick={onBack}
        className="absolute top-5 left-5 bg-pink-500/20 border border-pink-400 text-pink-200 px-4 py-2 rounded-lg z-50 font-bold shadow-[0_0_15px_#ff2b91]"
      >
        ← Back
      </button>

      <h1 className="relative z-10 text-5xl md:text-7xl font-serif text-pink-200 drop-shadow-[0_0_18px_#ff2b91] mb-2">
        Two Souls
      </h1>

      <h2 className="relative z-10 text-2xl md:text-4xl tracking-[12px] text-white mb-10">
        ONE STORY
      </h2>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center max-w-5xl">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => openCard(card)}
            className="w-[260px] h-[330px] bg-[#14000d]/80 border border-pink-500/60 rounded-3xl shadow-[0_0_25px_#ff2b91] p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition duration-300"
          >
            <img
              src={card.image}
              className="w-full h-48 object-cover rounded-2xl mb-4 border-2 border-pink-500 shadow-[0_0_20px_#ff2b91]"
            />

            <h2 className="text-2xl font-bold text-pink-300 text-center drop-shadow-[0_0_10px_#ff2b91]">
              {card.title}
            </h2>

            <p className="text-sm text-pink-100 mt-2">Click to open</p>
          </div>
        ))}
      </div>

      {/* GAME QUIZ */}
      {selectedCard?.type === "game" && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-[#12000c] border border-pink-500 w-[350px] md:w-[650px] rounded-3xl shadow-[0_0_35px_#ff2b91] p-7 text-center relative">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-5 text-pink-300 text-3xl font-bold"
            >
              ×
            </button>

            <h2 className="text-4xl font-bold text-pink-300 mb-2">
              Memory Quiz 📸
            </h2>

            <p className="text-pink-100 mb-6">
              Correct answer podda mattum pass aagum 💕
            </p>

            {!quizPassed ? (
              <div className="space-y-4 text-left">
                {[
                  ["firstMeet", "1. First meet enga?"],
                  ["firstCall", "2. First call eppo / enga?"],
                  ["favoriteFood", "3. Favorite food?"],
                  ["nickName", "4. First nickname?"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className="text-pink-200 font-bold">{label}</label>
                    <input
                      value={quizAnswers[key]}
                      onChange={(e) =>
                        setQuizAnswers({ ...quizAnswers, [key]: e.target.value })
                      }
                      className="w-full mt-2 p-3 rounded-xl bg-white text-pink-700 outline-none"
                      placeholder="Answer..."
                    />
                  </div>
                ))}

                {quizError && (
                  <p className="text-red-300 text-center font-bold">
                    {quizError}
                  </p>
                )}

                <button
                  onClick={checkQuiz}
                  className="w-full bg-pink-600 text-white py-3 rounded-full font-bold shadow-[0_0_20px_#ff2b91]"
                >
                  Submit 💖
                </button>
              </div>
            ) : (
              <div className="py-14 flex flex-col items-center">
                <h3 className="text-5xl font-serif text-pink-300">
                  You pass cellakuddy 🎉
                </h3>

                <p className="text-2xl text-pink-100 mt-4 font-serif">
                  Happy Birthday di 💖
                </p>

                <button
                  onClick={() => {
                    resetPuzzle();
                    setSelectedCard({ type: "photoGame" });
                  }}
                  className="mt-8 bg-pink-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-[0_0_25px_#ff2b91]"
                >
                  Next Game 💕
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PHOTO PUZZLE GAME */}
      {selectedCard?.type === "photoGame" && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4 overflow-hidden">
          <button
            onClick={() => setSelectedCard(null)}
            className="absolute top-6 right-8 text-pink-200 text-5xl font-bold z-50"
          >
            ×
          </button>

          <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl text-pink-200 font-serif mb-4 text-center">
              Join Our Photo Puzzle 💞
            </h1>

            {!puzzleSolved ? (
              <>
                <div className="grid grid-cols-3 gap-0 w-[330px] h-[495px] md:w-[420px] md:h-[630px] border-4 border-pink-400 rounded-[30px] overflow-hidden shadow-[0_0_45px_#ff2b91] bg-black">
                  {puzzlePieces.map((piece, index) => {
                    const x = piece % 3;
                    const y = Math.floor(piece / 3);

                    return (
                      <div
                        key={index}
                        onClick={() => handlePuzzleClick(index)}
                        className={`cursor-pointer border border-pink-300 transition-all duration-300 ${
                          selectedPiece === index
                            ? "scale-95 brightness-125"
                            : "hover:brightness-110"
                        }`}
                        style={{
                          backgroundImage: "url('/couple-traditional.jpg')",
                          backgroundSize: "420px 630px",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: `${-x * 140}px ${-y * 210}px`,
                        }}
                      />
                    );
                  })}
                </div>

                <p className="text-pink-200 mt-5 text-center">
                  Oru piece click pannitu, innoru piece click pannunga 💕
                </p>

                <button
                  onClick={resetPuzzle}
                  className="mt-4 bg-white text-pink-700 px-6 py-3 rounded-full font-bold"
                >
                  Reset Puzzle
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src="/couple-traditional.jpg"
                  className="w-[330px] md:w-[420px] h-auto rounded-[35px] border-4 border-pink-400 shadow-[0_0_45px_#ff2b91]"
                />
                <h2 className="text-4xl md:text-5xl font-serif text-pink-300 mt-8 text-center">
                  Perfect Match 💖
                </h2>
                <p className="text-pink-100 text-xl mt-4 text-center">
                  Nee yum naanum forever 🥺💕
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REAL ALBUM */}
      {selectedCard?.type === "album" && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4 overflow-hidden">
          <button
            onClick={() => setSelectedCard(null)}
            className="absolute top-6 right-8 text-pink-200 text-4xl font-bold z-50"
          >
            ×
          </button>

          <div className="relative z-10">
            <h2 className="text-center text-4xl md:text-5xl font-serif text-white mb-8">
              Happy Birthday 💖 Our Love Album 💌
            </h2>

            <div
              onClick={nextPage}
              className="relative w-[95vw] max-w-6xl h-[620px] cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#4a001f] rounded-[28px] shadow-[0_0_50px_#ff2b91] border-4 border-pink-400"></div>

              <div className="absolute left-0 top-0 w-1/2 h-full bg-[#fff1f7] rounded-l-[28px] p-8 border-r-4 border-pink-300 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-2xl p-4 shadow-2xl rotate-[-2deg]">
                  <img
                    src={albumPages[page].img}
                    className="w-full h-full object-contain rounded-xl bg-white"
                  />
                </div>
              </div>

              <div
                className={`absolute right-0 top-0 w-1/2 h-full bg-[#fff1f7] rounded-r-[28px] p-10 flex flex-col justify-center ${
                  flipping ? "flip-page" : ""
                }`}
              >
                <h3 className="text-3xl font-serif text-pink-600 mb-6">
                  Happy Birthday da 💖
                </h3>
                <p className="text-[#7a003c] text-xl md:text-2xl leading-[2.6rem] font-serif">
                  {albumPages[page].text}
                </p>
              </div>

              <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-4 bg-gradient-to-r from-pink-400 via-white to-pink-400 shadow-xl"></div>
            </div>

            {page > 0 && (
              <button
                onClick={prevPage}
                className="mt-6 bg-white text-pink-700 px-6 py-3 rounded-full font-bold"
              >
                ← Previous
              </button>
            )}
          </div>
        </div>
      )}

      {/* OTHER DETAILS */}
      {selectedCard && !["album", "game", "photoGame"].includes(selectedCard.type) && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#12000c] border border-pink-500 w-[340px] md:w-[650px] min-h-[430px] rounded-3xl shadow-[0_0_35px_#ff2b91] p-7 text-center relative">
            <button
              onClick={() => {
                setSelectedCard(null);
                setBirthdayUnlocked(false);
                setMarryAnswer("");
                setShowCake(false);
                setSecretOpened(false);
                setShowTreasure(false);
              }}
              className="absolute top-4 right-5 text-pink-300 text-3xl font-bold"
            >
              ×
            </button>

            {selectedCard.title === "Birthday Wish" && !birthdayUnlocked ? (
              <div className="py-10">
                <h2 className="text-4xl font-serif text-pink-300 mb-6">
                  Happy Birthday di paddu mani 💖
                </h2>
                <p className="text-2xl text-pink-100 mb-6 font-serif">
                  Will you marry me? 💍
                </p>
                <input
                  value={marryAnswer}
                  onChange={(e) => setMarryAnswer(e.target.value)}
                  placeholder="Type yes..."
                  className="w-full p-3 rounded-xl bg-white text-pink-700 outline-none mb-5 text-center"
                />
                <button
                  onClick={() =>
                    normalize(marryAnswer) === "yes"
                      ? setBirthdayUnlocked(true)
                      : alert("Yes endu type pannu paddu mani 🥺💕")
                  }
                  className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold"
                >
                  Open Birthday Wish 💌
                </button>
              </div>
            ) : selectedCard.title === "Birthday Wish" ? (
              <div className="bg-[#fff1f7] text-[#7a003c] p-7 rounded-3xl border-2 border-pink-400 shadow-[0_0_25px_#ff2b91]">
                <h3 className="text-3xl font-serif mb-5">To my paddu mani 💖</h3>
                <p className="text-lg leading-8 font-serif text-left">
                  Happy Birthday da Thangapulla ❤️ Un dreams ellam true aaganum.
                  Nee epovum happy ah irukkanum. I love you forever 💕
                </p>

                <div className="mt-6 space-y-4">
                  <div className="bg-white p-4 rounded-2xl shadow">
                    <p className="font-bold mb-2">Voice Message 1 🎙️</p>
                    <audio controls className="w-full">
                      <source src="/voice1.mp3" type="audio/mp3" />
                    </audio>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow">
                    <p className="font-bold mb-2">Voice Message 2 🎙️</p>
                    <audio controls className="w-full">
                      <source src="/voice2.mp3" type="audio/mp3" />
                    </audio>
                  </div>
                </div>

                <button
                  onClick={() => setShowCake(true)}
                  className="mt-6 bg-pink-600 text-white px-8 py-3 rounded-full font-bold"
                >
                  Open Cake 🎂
                </button>
              </div>
            ) : selectedCard.title === "Secret Letter" ? (
              <div className="py-4">
                {!secretOpened ? (
                  <div className="flex flex-col items-center">
                    <h2 className="text-4xl font-serif text-pink-300 mb-4">
                      Gift For My Boyfriend ❤️
                    </h2>
                    <button
                      onClick={() => setSecretOpened(true)}
                      className="text-9xl hover:scale-110 transition drop-shadow-[0_0_25px_#ff2b91]"
                    >
                      🎁
                    </button>
                    <p className="text-pink-100 mt-4">Open Me 🎁</p>
                  </div>
                ) : !showTreasure ? (
                  <div className="bg-[#fff7ed] text-[#6b1d1d] p-7 rounded-3xl border-2 border-pink-400 shadow-[0_0_25px_#ff2b91]">
                    <h2 className="text-4xl font-serif mb-5">Dear Love,</h2>
                    <p className="text-lg md:text-xl leading-9 font-serif text-left">
                      On this special day, I want to tell you something from my heart.
                      You are not just my love, you are my peace, my happiness, and
                      my favorite person. Thank you for being with me, caring for me,
                      and making my world beautiful. ❤️
                    </p>
                    <p className="text-lg md:text-xl leading-9 font-serif text-left mt-4">
                      But your surprise is not finished yet da... I have hidden some
                      gifts for you. You have to find them one by one using my clues.
                      Ready ah? 🥺💕
                    </p>
                    <button
                      onClick={() => setShowTreasure(true)}
                      className="mt-8 bg-pink-600 text-white px-8 py-4 rounded-full font-bold shadow-[0_0_20px_#ff2b91]"
                    >
                      Ready To Search Surprise? 🔍🎁
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#fff1f7] text-[#7a003c] p-7 rounded-3xl border-2 border-pink-400 shadow-[0_0_25px_#ff2b91]">
                    <h2 className="text-3xl font-serif mb-4">
                      {clues[huntStep].title}
                    </h2>
                    <p className="text-lg leading-8 mb-6">
                      {clues[huntStep].text}
                    </p>
                    <input
                      value={huntAnswer}
                      onChange={(e) => setHuntAnswer(e.target.value)}
                      placeholder="Gift kandupidicha aprm yes type pannu..."
                      className="w-full p-3 rounded-xl bg-white text-pink-700 outline-none mb-4 text-center"
                    />
                    {huntError && (
                      <p className="text-red-500 font-bold mb-3">
                        {huntError}
                      </p>
                    )}
                    <button
                      onClick={checkHunt}
                      className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold"
                    >
                      Next Clue 💕
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-pink-300 mb-6">
                  {selectedCard.title}
                </h2>
                <img
                  src={selectedCard.image}
                  className="w-full h-56 object-cover rounded-2xl mb-5 border border-pink-500"
                />
                <p className="text-pink-100 text-lg leading-8 font-serif">
                  {selectedCard.content}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* CAKE SURPRISE */}
      {showCake && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999] px-4">
          <button
            onClick={() => setShowCake(false)}
            className="absolute top-6 right-8 text-pink-200 text-5xl font-bold"
          >
            ×
          </button>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif text-pink-200 mb-8 animate-bounce">
              Happy Birthday di paddu mani 💖
            </h1>

            <div className="relative mx-auto w-[280px] h-[300px]">
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-24 bg-pink-300 rounded-md"></div>
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 text-5xl animate-pulse">
                🔥
              </div>
              <div className="absolute bottom-0 left-0 w-full h-36 bg-pink-500 rounded-t-3xl shadow-[0_0_35px_#ff2b91]"></div>
              <div className="absolute bottom-24 left-0 w-full h-12 bg-white rounded-t-3xl"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-8xl">
                🎂
              </div>
            </div>

            <p className="mt-10 text-3xl font-serif text-pink-100 animate-pulse">
              Happy Birthday 🎉 Happy Birthday 🎉
            </p>

            <button
              onClick={() => alert("Candle blown 🎂💨 Happy Birthday my love 💖")}
              className="mt-8 bg-white text-pink-700 px-8 py-3 rounded-full font-bold"
            >
              Blow Candle 💨
            </button>
          </div>
        </div>
      )}
    </div>
  );
}