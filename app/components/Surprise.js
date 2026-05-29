"use client";

import { useState } from "react";

export default function Surprise({ onBack }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const [birthdayUnlocked, setBirthdayUnlocked] = useState(false);
  const [marryAnswer, setMarryAnswer] = useState("");
  const [showCake, setShowCake] = useState(false);

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
    {
      img: "/album1.jpg",
      text: "Happy Birthday da my love ❤️ first enakku nee yaar nu kooda therija unmajilaje ithu kadavul da seijal ah ennanu vilankave illa. Insta la paatham kathachcham first our meet insta. Enakku rompa pidichcha person ah nee maarite pona. Sorry di thanka paddu ❤️ Nee en life la vandha aprm ellame beautiful aayiduchu.",
    },
    {
      img: "/album2.jpg",
      text: "Un smile paatha pothum enakku full day happy ah irukkum 🥺💕 Sari ore emotion ah kondu pokela. Kelvi paddan ithaan Colombo style smile endu apdja bossuuuu 🌍💕",
    },
    {
      img: "/album3.jpg",
      text: "Nee enakku romba special. Enoda favorite person nee thaan da 💖 First time padam paaka poname rompa happy da thankapulla.",
    },
    {
      img: "/album4.jpg",
      text: "Un kooda irukkira every moment enakku precious memory madhiri ✨ Happy birthday too youu 🥺💕 Happy birthday dear thankapulla paddumani 🥺💕 Ithu ennanu japakam irukka panni kuddy 🥺💕",
    },
    {
      img: "/album5.jpg",
      text: "Nee happy ah irukkanum. Un dreams ellam true aaganum 🎂 Naan epovum unakku support ah iruppen.",
    },
    {
      img: "/album6.jpg",
      text: "Nee en peace, en happiness, en ujir ulakam 🌍💕 Un kooda irukkum pothu naan romba lucky ah feel pannuren.",
    },
    {
      img: "/album7.jpg",
      text: "Thank you for loving me and staying with me always 💍 Happy Birthday my paddukuddy. I love you forever 💘",
    },
  ];

  const cards = [
    { title: "Love Story", image: "/card1.jpg", type: "album" },
    {
      title: "Birthday Wish",
      image: "/card2.jpg",
      content: "Happy Birthday da Thangapulla ❤️ Un dreams ellam true aaganum.",
    },
    {
      title: "Images",
      image: "/card3.jpg",
      content: "Our beautiful memories together 📸💕",
    },
    {
      title: "Game",
      image: "/card4.jpg",
      type: "game",
    },
    {
      title: "Secret Letter",
      image: "/card5.jpg",
      content: "You are my peace, my happiness, my ujir ulakam 🌍💕",
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
    setQuizAnswers({
      firstMeet: "",
      firstCall: "",
      favoriteFood: "",
      nickName: "",
    });
    resetPuzzle();
  };

  const normalize = (value) => value.toLowerCase().trim().replace(/\s+/g, " ");

  const checkQuiz = () => {
    const firstMeetOk = normalize(quizAnswers.firstMeet) === "vanni in resturant";
    const firstCallOk = normalize(quizAnswers.firstCall) === "nakathampiran kovil";
    const foodOk = normalize(quizAnswers.favoriteFood).length > 0;
    const nickNameOk = normalize(quizAnswers.nickName) === "mine diary";

    if (firstMeetOk && firstCallOk && foodOk && nickNameOk) {
      setQuizPassed(true);
      setQuizError("");
    } else {
      setQuizPassed(false);
      setQuizError("Konjam yosichu correct answer podu da 😭💕");
    }
  };

  const handlePuzzleClick = (index) => {
    if (puzzleSolved) return;

    if (selectedPiece === null) {
      setSelectedPiece(index);
      return;
    }

    const newPieces = [...puzzlePieces];
    const temp = newPieces[selectedPiece];
    newPieces[selectedPiece] = newPieces[index];
    newPieces[index] = temp;

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

        @keyframes petalFall {
          0% { transform: translateY(-120px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }

        .petal {
          animation-name: petalFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
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
      {selectedCard && selectedCard.type === "game" && (
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
                <div>
                  <label className="text-pink-200 font-bold">1. First meet enga?</label>
                  <input
                    value={quizAnswers.firstMeet}
                    onChange={(e) =>
                      setQuizAnswers({ ...quizAnswers, firstMeet: e.target.value })
                    }
                    className="w-full mt-2 p-3 rounded-xl bg-white text-pink-700 outline-none"
                    placeholder="Answer..."
                  />
                </div>

                <div>
                  <label className="text-pink-200 font-bold">2. First call eppo / enga?</label>
                  <input
                    value={quizAnswers.firstCall}
                    onChange={(e) =>
                      setQuizAnswers({ ...quizAnswers, firstCall: e.target.value })
                    }
                    className="w-full mt-2 p-3 rounded-xl bg-white text-pink-700 outline-none"
                    placeholder="Answer..."
                  />
                </div>

                <div>
                  <label className="text-pink-200 font-bold">3. Favorite food?</label>
                  <input
                    value={quizAnswers.favoriteFood}
                    onChange={(e) =>
                      setQuizAnswers({ ...quizAnswers, favoriteFood: e.target.value })
                    }
                    className="w-full mt-2 p-3 rounded-xl bg-white text-pink-700 outline-none"
                    placeholder="Anything..."
                  />
                </div>

                <div>
                  <label className="text-pink-200 font-bold">4. First nickname?</label>
                  <input
                    value={quizAnswers.nickName}
                    onChange={(e) =>
                      setQuizAnswers({ ...quizAnswers, nickName: e.target.value })
                    }
                    className="w-full mt-2 p-3 rounded-xl bg-white text-pink-700 outline-none"
                    placeholder="Answer..."
                  />
                </div>

                {quizError && (
                  <p className="text-red-300 text-center font-bold">{quizError}</p>
                )}

                <button
                  onClick={checkQuiz}
                  className="w-full bg-pink-600 text-white py-3 rounded-full font-bold shadow-[0_0_20px_#ff2b91] hover:scale-105 transition"
                >
                  Submit 💖
                </button>
              </div>
            ) : (
              <div className="py-14 flex flex-col items-center">
                <h3 className="text-5xl font-serif text-pink-300 drop-shadow-[0_0_20px_#ff2b91]">
                  You pass cellakuddy 🎉
                </h3>

                <p className="text-2xl text-pink-100 mt-4 font-serif">
                  Happy Birthday di 💖
                </p>

                <p className="text-pink-200 mt-3 text-center">
                  Nee ellam correct ah remember pannirukka 🥺💕
                </p>

                <button
                  onClick={() => {
                    resetPuzzle();
                    setSelectedCard({ type: "photoGame" });
                  }}
                  className="mt-8 bg-pink-600 hover:bg-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-[0_0_25px_#ff2b91] transition"
                >
                  Next Game 💕
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PHOTO PUZZLE GAME */}
      {selectedCard && selectedCard.type === "photoGame" && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#5a002d_0%,#160010_45%,#050005_100%)]"></div>

          <button
            onClick={() => setSelectedCard(null)}
            className="absolute top-6 right-8 text-pink-200 text-5xl font-bold z-50"
          >
            ×
          </button>

          <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl text-pink-200 font-serif drop-shadow-[0_0_25px_#ff2b91] mb-4 text-center">
              Join Our Photo Puzzle 💞
            </h1>

            <p className="text-pink-100 mb-6 text-center">
              Pieces correct ah join pannina photo open aagum 🥺💕
            </p>

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
                          width: "100%",
                          height: "100%",
                        }}
                      ></div>
                    );
                  })}
                </div>

                <p className="text-pink-200 mt-5 text-center">
                  Oru piece click pannitu, innoru piece click pannunga 💕
                </p>

                <button
                  onClick={resetPuzzle}
                  className="mt-4 bg-white text-pink-700 px-6 py-3 rounded-full font-bold shadow-[0_0_20px_#ff2b91]"
                >
                  Reset Puzzle
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src="/couple-traditional.jpg"
                  className="w-[330px] md:w-[420px] h-auto object-cover rounded-[35px] border-4 border-pink-400 shadow-[0_0_45px_#ff2b91]"
                />

                <h2 className="text-4xl md:text-5xl font-serif text-pink-300 mt-8 drop-shadow-[0_0_20px_#ff2b91] text-center">
                  Perfect Match 💖
                </h2>

                <p className="text-pink-100 text-xl mt-4 text-center">
                  Nee yum naanum forever 🥺💕
                </p>

                <div className="text-5xl mt-5 animate-bounce">💋</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REAL ALBUM */}
      {selectedCard && selectedCard.type === "album" && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4 overflow-hidden">
          <div
            className="absolute inset-0 opacity-50 bg-cover bg-center"
            style={{ backgroundImage: "url('/album-bg.jpg')" }}
          ></div>

          <div className="absolute inset-0 bg-pink-950/50"></div>

          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute petal text-2xl"
              style={{
                left: `${(i * 13) % 100}%`,
                animationDuration: `${7 + (i % 5)}s`,
                animationDelay: `${i * 0.45}s`,
              }}
            >
              🌸
            </span>
          ))}

          <button
            onClick={() => setSelectedCard(null)}
            className="absolute top-6 right-8 text-pink-200 text-4xl font-bold z-50"
          >
            ×
          </button>

          <div className="relative z-10">
            <h2 className="text-center text-4xl md:text-5xl font-serif text-white drop-shadow-[0_0_18px_#ff2b91] mb-8">
              Happy Birthday 💖 Our Love Album 💌
            </h2>

            <div
              onClick={nextPage}
              className="relative w-[95vw] max-w-6xl h-[620px] perspective-[2000px] cursor-pointer"
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
                <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-pink-300/60 to-transparent"></div>

                <h3 className="text-3xl font-serif text-pink-600 mb-6">
                  Happy Birthday da 💖
                </h3>

                <p className="text-[#7a003c] text-xl md:text-2xl leading-[2.6rem] font-serif">
                  {albumPages[page].text}
                </p>
              </div>

              <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-4 bg-gradient-to-r from-pink-400 via-white to-pink-400 shadow-xl"></div>

              <div className="absolute top-6 left-8 text-4xl rotate-[-20deg] z-20">💋</div>
              <div className="absolute bottom-8 left-[45%] text-4xl rotate-[18deg] z-20">💋</div>
              <div className="absolute top-10 right-10 text-4xl rotate-[25deg] z-20">💋</div>
              <div className="absolute bottom-10 right-16 text-4xl rotate-[-15deg] z-20">💋</div>
            </div>

            {page > 0 && (
              <button
                onClick={prevPage}
                className="mt-6 bg-white text-pink-700 px-6 py-3 rounded-full font-bold shadow-lg"
              >
                ← Previous
              </button>
            )}
          </div>
        </div>
      )}

      {/* OTHER DETAILS */}
      {selectedCard &&
        selectedCard.type !== "album" &&
        selectedCard.type !== "game" &&
        selectedCard.type !== "photoGame" && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-[#12000c] border border-pink-500 w-[340px] md:w-[650px] min-h-[430px] rounded-3xl shadow-[0_0_35px_#ff2b91] p-7 text-center relative">
              <button
                onClick={() => {
                  setSelectedCard(null);
                  setBirthdayUnlocked(false);
                  setMarryAnswer("");
                  setShowCake(false);
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
                    onClick={() => {
                      if (marryAnswer.toLowerCase().trim() === "yes") {
                        setBirthdayUnlocked(true);
                      } else {
                        alert("Yes endu type pannu paddu mani 🥺💕");
                      }
                    }}
                    className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-[0_0_20px_#ff2b91]"
                  >
                    Open Birthday Wish 💌
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-4xl font-bold text-pink-300 mb-6">
                    {selectedCard.title}
                  </h2>

                  {selectedCard.title === "Birthday Wish" ? (
                    <div className="bg-[#fff1f7] text-[#7a003c] p-7 rounded-3xl border-2 border-pink-400 shadow-[0_0_25px_#ff2b91]">
                      <h3 className="text-3xl font-serif mb-5">
                        To my paddu mani 💖
                      </h3>

                      <p className="text-lg leading-8 font-serif text-left">
                        Happy Birthday da Thangapulla ❤️ Un dreams ellam true
                        aaganum. Nee epovum happy ah irukkanum. En life la nee
                        vandhathuku apram ellame romba beautiful aayiduchu.
                        I love you forever 💕
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

                      <p className="mt-6 text-right font-serif">
                        Forever yours,
                        <br />
                        Mine 💋
                      </p>

                      <button
                        onClick={() => setShowCake(true)}
                        className="mt-6 bg-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-[0_0_20px_#ff2b91]"
                      >
                        Open Cake 🎂
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        src={selectedCard.image}
                        className="w-full h-56 object-cover rounded-2xl mb-5 border border-pink-500"
                      />

                      <p className="text-pink-100 text-lg leading-8 font-serif">
                        {selectedCard.content}
                      </p>
                    </>
                  )}
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
            <h1 className="text-4xl md:text-6xl font-serif text-pink-200 mb-8 animate-bounce drop-shadow-[0_0_25px_#ff2b91]">
              Happy Birthday di paddu mani 💖
            </h1>

            <div className="relative mx-auto w-[280px] h-[300px]">
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-24 bg-pink-300 rounded-md shadow-[0_0_15px_#ff2b91]"></div>

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
              Happy Birthday 🎉 Happy Birthday 🎉 Happy Birthday 🎉
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