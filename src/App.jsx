import React, { useState, useEffect, useRef } from 'react';
import { Gift, Heart, Star, Sparkles, PartyPopper, Cake, Volume2, VolumeX, RotateCcw, Share, Trophy, Zap, ThumbsDown, GamepadIcon, Target, Award } from 'lucide-react';

const BirthdayGame = () => {
  const [gameMode, setGameMode] = useState(null); // 'points' or 'rating'
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [clickedBalls, setClickedBalls] = useState(new Set());
  const [gameStarted, setGameStarted] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [ballAnimations, setBallAnimations] = useState({});
  const [magicMode, setMagicMode] = useState(false);
  const [collectedStars, setCollectedStars] = useState(0);
  const [collectedCurses, setCollectedCurses] = useState(0);
  const [specialEffects, setSpecialEffects] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ballPoints, setBallPoints] = useState({});
  const [friendRatings, setFriendRatings] = useState({});
  const [currentRating, setCurrentRating] = useState(50);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);
  
  // Function to handle speech synthesis
  const toggleSpeech = (text) => {
    if (!window.speechSynthesis) {
      alert('Tu navegador no soporta síntesis de voz.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (audioRef.current) audioRef.current.volume = 1;
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => {
        setIsSpeaking(true);
        if (audioRef.current) audioRef.current.volume = 0.1;
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        if (audioRef.current) audioRef.current.volume = 1;
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        if (audioRef.current) audioRef.current.volume = 1;
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  // Stop speech and restore volume when modal closes
  useEffect(() => {
    if (!showMessage && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (audioRef.current) audioRef.current.volume = 1;
    }
  }, [showMessage]);

  const friends = [
    {
      id: 1,
      name: "María",
      color: "bg-pink-400",
      message: "¡Feliz cumpleaños! Eres una persona increíble y estoy muy agradecida de tenerte en mi vida. Que este nuevo año te traiga muchas aventuras y momentos felices. ¡Te quiero mucho! 🎉💕",
      icon: Heart,
      photo: "/photos/maria.jpg"
    },
    {
      id: 2,
      name: "Carlos",
      color: "bg-blue-400",
      message: "¡Hey cumpleañero/a! Espero que tengas un día fantástico lleno de risas y buena comida. Gracias por ser un amigo tan genial y por todos los buenos momentos que hemos compartido. ¡A celebrar! 🎂🎈",
      icon: Gift,
      photo: "/photos/carlos.jpg"
    },
    {
      id: 3,
      name: "Ana",
      color: "bg-green-400",
      message: "¡Felicidades en tu día especial! Eres una de las personas más divertidas que conozco. Que cumplas muchos más años llenos de salud, amor y éxito. ¡Disfruta tu día al máximo! ✨🌟",
      icon: Star,
      photo: "/photos/ana.jpg"
    },
    {
      id: 4,
      name: "Pedro",
      color: "bg-yellow-400",
      message: "¡Cumpleaños feliz! Me alegra mucho poder celebrar contigo otro año de vida. Eres una persona especial que siempre sabe cómo hacer sonreír a los demás. ¡Que tengas un día maravilloso! 🎊🎁",
      icon: PartyPopper,
      photo: "/photos/pedro.jpg"
    },
    {
      id: 5,
      name: "Laura",
      color: "bg-purple-400",
      message: "¡Feliz cumple! Gracias por ser tan buena persona y por todos los momentos increíbles que hemos vivido juntos. Espero que este nuevo año de vida esté lleno de nuevas oportunidades y mucha felicidad. 💜🎯",
      icon: Sparkles,
      photo: "/photos/laura.jpg"
    },
    {
      id: 6,
      name: "Diego",
      color: "bg-red-400",
      message: "¡Qué tengas un cumpleaños espectacular! Eres una persona única y especial. Que este año te traiga todo lo que deseas y más. ¡Vamos a celebrar como se debe! 🔥🎸",
      icon: Cake,
      photo: "/photos/diego.jpg"
    },
    {
      id: 7,
      name: "Sofia",
      color: "bg-indigo-400",
      message: "¡Feliz cumpleaños querido/a! Tu amistad significa mucho para mí. Eres alguien en quien siempre puedo confiar. Que tengas un año lleno de bendiciones y momentos hermosos. 💙🦋",
      icon: Heart,
      photo: "/photos/sofia.jpg"
    },
    {
      id: 8,
      name: "Miguel",
      color: "bg-orange-400",
      message: "¡Cumpleaños feliz! Espero que tu día esté lleno de sorpresas maravillosas. Gracias por ser un amigo tan leal y divertido. ¡Que celebres muchos cumpleaños más! 🧡🎭",
      icon: Gift,
      photo: "/photos/miguel.jpg"
    },
    {
      id: 9,
      name: "Carmen",
      color: "bg-teal-400",
      message: "¡Feliz cumple! Eres una persona extraordinaria con un corazón enorme. Me siento afortunada de conocerte. Que este nuevo año de vida esté lleno de amor, risas y aventuras. 💚🌺",
      icon: Star,
      photo: "/photos/carmen.jpg"
    },
    {
      id: 10,
      name: "Javier",
      color: "bg-cyan-400",
      message: "¡Felicidades! Otro año más de vida para celebrar todo lo increíble que eres. Gracias por ser un amigo tan genial y por todos los buenos ratos. ¡A disfrutar este día especial! 🎨🎪",
      icon: PartyPopper,
      photo: "/photos/javier.jpg"
    },
    {
      id: 11,
      name: "Isabel",
      color: "bg-rose-400",
      message: "¡Feliz cumpleaños! Eres una persona muy especial que siempre ilumina el día de los demás. Que este nuevo año te traiga mucha paz, amor y todas las cosas buenas que mereces. 🌸✨",
      icon: Sparkles,
      photo: "/photos/isabel.jpg"
    }
  ];

  // Generate random points when game starts
  const generateRandomPoints = () => {
    const points = {};
    friends.forEach(friend => {
      const randomPoints = Math.floor(Math.random() * 201) - 100; // -100 to 100
      points[friend.id] = randomPoints;
    });
    setBallPoints(points);
  };

  const generateConfetti = (amount = 40) => {
    const newConfetti = [];
    for (let i = 0; i < amount; i++) {
      newConfetti.push({
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: ['text-pink-400', 'text-blue-400', 'text-yellow-400', 'text-green-400', 'text-purple-400'][Math.floor(Math.random() * 5)],
        symbol: ['✨', '🎉', '🎊', '⭐', '💖', '🎈'][Math.floor(Math.random() * 6)]
      });
    }
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 4000);
  };

  const generateSpecialEffect = (type, x, y) => {
    const effect = {
      id: Math.random(),
      type,
      x,
      y,
      timestamp: Date.now()
    };
    setSpecialEffects(prev => [...prev, effect]);
    setTimeout(() => {
      setSpecialEffects(prev => prev.filter(e => e.id !== effect.id));
    }, 2000);
  };

  const handleBallClick = (friend, event) => {
    if (!gameStarted) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setSelectedFriend(friend);
    setClickedBalls(prev => new Set([...prev, friend.id]));

    if (gameMode === 'points') {
      const points = ballPoints[friend.id];
      setScore(prev => prev + points);

      // Random special effects
      if (Math.random() < 0.3) { // 30% chance for star bonus
        setCollectedStars(prev => prev + 1);
        setScore(prev => prev + 50); // Bonus points
        generateSpecialEffect('star', x, y);
      }

      if (Math.random() < 0.2) { // 20% chance for curse penalty
        setCollectedCurses(prev => prev + 1);
        setScore(prev => prev - 30); // Penalty points
        generateSpecialEffect('curse', x, y);
      }
    }

    // Ball animation
    setBallAnimations(prev => ({
      ...prev,
      [friend.id]: 'animate-spin'
    }));

    // Show message after animation
    setTimeout(() => {
      setShowMessage(true);
      setBallAnimations(prev => ({
        ...prev,
        [friend.id]: ''
      }));
    }, 1000);

    generateConfetti(50);
    generateSpecialEffect('celebration', x, y);

    if (Math.random() < 0.3) {
      setMagicMode(true);
      setTimeout(() => setMagicMode(false), 3000);
    }
  };

  const handleRatingSubmit = () => {
    setFriendRatings(prev => ({
      ...prev,
      [selectedFriend.id]: currentRating
    }));
    setShowRatingModal(false);
    setShowMessage(false);
    setCurrentRating(50);
  };

  const startGame = (mode) => {
    setGameMode(mode);
    setGameStarted(true);
    if (mode === 'points') {
      generateRandomPoints();
    }
    generateConfetti(80);
    if (musicEnabled && audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetGame = () => {
    setGameMode(null);
    setClickedBalls(new Set());
    setGameStarted(false);
    setShowMessage(false);
    setSelectedFriend(null);
    setScore(0);
    setCollectedStars(0);
    setCollectedCurses(0);
    setMagicMode(false);
    setBallAnimations({});
    setSpecialEffects([]);
    setShowCelebration(false);
    setBallPoints({});
    setFriendRatings({});
    setShowRatingModal(false);
    setCurrentRating(50);
  };

  const shareMessage = () => {
    let message = '';
    if (gameMode === 'points') {
      const result = score >= 0 ? 'gané' : 'perdí';
      message = `¡Acabo de ${result} en el juego de cumpleaños! 🎉 Obtuve ${score} puntos, ${collectedStars} estrellas bonus y ${collectedCurses} maldiciones. #FelizCumpleanos`;
    } else {
      const avgRating = Object.values(friendRatings).reduce((a, b) => a + b, 0) / Object.values(friendRatings).length;
      message = `¡Califiqué todas las felicitaciones de cumpleaños! 🎉 Promedio: ${avgRating.toFixed(1)}/100. #FelizCumpleanos`;
    }
    
    if (navigator.share) {
      navigator.share({ text: message });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(message);
      alert('¡Mensaje copiado al portapapeles!');
    } else {
      alert(message);
    }
  };

  const getBestRatedFriend = () => {
    if (Object.keys(friendRatings).length === 0) return null;
    const bestId = Object.keys(friendRatings).reduce((a, b) => 
      friendRatings[a] > friendRatings[b] ? a : b
    );
    return friends.find(f => f.id === parseInt(bestId));
  };

  const getWorstRatedFriend = () => {
    if (Object.keys(friendRatings).length === 0) return null;
    const worstId = Object.keys(friendRatings).reduce((a, b) => 
      friendRatings[a] < friendRatings[b] ? a : b
    );
    return friends.find(f => f.id === parseInt(worstId));
  };

  // Show celebration when all messages are read
  useEffect(() => {
    if (clickedBalls.size === friends.length && !showCelebration) {
      setShowCelebration(true);
      generateConfetti(100);
      setMagicMode(true);
      setTimeout(() => setMagicMode(false), 5000);
    }
  }, [clickedBalls.size, showCelebration, friends.length]);

  // Control audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (musicEnabled && gameStarted) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicEnabled, gameStarted]);

  // Game mode selection screen
  if (!gameMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 shadow-2xl max-w-4xl w-full">
          <div className="text-center mb-12">
            <Cake className="w-24 h-24 mx-auto mb-6 text-yellow-300 animate-bounce" />
            <h1 className="text-5xl font-bold text-white mb-4 titulo_feliz_cumple">
              ¡FELIZ CUMPLEAÑOS Miguel! 🎂
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Elige tu tipo de juego favorito para descubrir las felicitaciones
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Points Game */}
            <div className="bg-white/10 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <Target className="w-16 h-16 mx-auto mb-4 text-green-300" />
                <h3 className="text-2xl font-bold text-white mb-4">🎯 Juego de Puntos</h3>
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <ul className="text-white/90 space-y-2 text-left">
                    <li>• Descubre puntos aleatorios ocultos</li>
                    <li>• Pueden ser positivos o negativos</li>
                    <li>• Estrellas ⭐ suman puntos bonus</li>
                    <li>• Rayos ⚡ restan puntos</li>
                    <li>• ¡Gana si terminas con puntos positivos!</li>
                  </ul>
                </div>
                <button
                  onClick={() => startGame('points')}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <GamepadIcon className="w-5 h-5 inline mr-2" />
                  ¡Jugar con Puntos!
                </button>
              </div>
            </div>

            {/* Rating Game */}
            <div className="bg-white/10 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-2xl font-bold text-white mb-4">⭐ Juego de Calificaciones</h3>
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <ul className="text-white/90 space-y-2 text-left">
                    <li>• Califica cada felicitación del 1-100</li>
                    <li>• Usa el deslizador para puntuar</li>
                    <li>• Descubre quién te felicitó mejor</li>
                    <li>• Ve el ranking final de amigos</li>
                    <li>• ¡Comparte tu promedio de calificaciones!</li>
                  </ul>
                </div>
                <button
                  onClick={() => startGame('rating')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Star className="w-5 h-5 inline mr-2" />
                  ¡Jugar Calificando!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted) return null;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 relative overflow-hidden titulo_segunda_pantalla ${magicMode ? 'animate-pulse' : ''}`}>
      {/* Special effects */}
      {specialEffects.map((effect) => (
        <div
          key={effect.id}
          className="fixed pointer-events-none z-40"
          style={{ left: effect.x, top: effect.y, transform: 'translate(-50%, -50%)' }}
        >
          {effect.type === 'celebration' && <div className="text-6xl animate-ping">🎉</div>}
          {effect.type === 'star' && <div className="text-4xl animate-spin text-yellow-400">⭐</div>}
          {effect.type === 'curse' && <div className="text-4xl animate-bounce text-red-500">⚡</div>}
        </div>
      ))}

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`absolute top-0 ${piece.color} text-2xl animate-bounce pointer-events-none z-30`}
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: '4s'
          }}
        >
          {piece.symbol}
        </div>
      ))}

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-bounce">
             ¡FELIZ CUMPLEAÑOS! 
          </h1>
          <p className="text-xl text-white/90 mb-2">
            {gameMode === 'points' ? 'Descubre puntos ocultos' : 'Califica las felicitaciones'}
          </p>
          <p className="text-lg text-white/80 mb-6">
            Haz clic en las bolitas para descubrir los mensajes
          </p>
        </div>

        {/* Progress panel */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {gameMode === 'points' ? (
                <>
                  <div className={`flex items-center gap-2 text-white ${score >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    <Trophy className="w-6 h-6" />
                    <span className="font-bold text-lg">{score} puntos</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-300">
                    <Star className="w-6 h-6" />
                    <span className="font-bold">{collectedStars} bonus</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-300">
                    <Zap className="w-6 h-6" />
                    <span className="font-bold">{collectedCurses} maldiciones</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <Award className="w-6 h-6 text-yellow-300" />
                    <span className="font-bold text-lg">
                      {Object.keys(friendRatings).length > 0 
                        ? `${(Object.values(friendRatings).reduce((a, b) => a + b, 0) / Object.values(friendRatings).length).toFixed(1)}/100 promedio`
                        : 'Sin calificaciones aún'
                      }
                    </span>
                  </div>
                </>
              )}
              <div className="text-white font-semibold">
                {clickedBalls.size}/11 mensajes leídos
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMusicEnabled(!musicEnabled)}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-300"
              >
                {musicEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              
              <button
                onClick={shareMessage}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-300"
              >
                <Share className="w-5 h-5" />
              </button>
              
              <button
                onClick={resetGame}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-300"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all duration-700 flex items-center justify-center ${
                  gameMode === 'points' 
                    ? (score >= 0 ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gradient-to-r from-red-400 to-orange-500')
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                }`}
                style={{ width: `${(clickedBalls.size / 11) * 100}%` }}
              >
                {clickedBalls.size > 0 && (
                  <span className="text-white text-xs font-bold">
                    {Math.round((clickedBalls.size / 11) * 100)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Friends grid */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {friends.map((friend) => {
            const IconComponent = friend.icon;
            const isClicked = clickedBalls.has(friend.id);
            
            return (
              <div key={friend.id} className="flex flex-col items-center">
                <button
                  onClick={(e) => handleBallClick(friend, e)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-2xl flex items-center justify-center relative ${
                    isClicked ? `animate-bounce ${ballAnimations[friend.id] || ''} ring-4 ring-white/60` : 'hover:animate-pulse'
                  } ${magicMode ? 'animate-pulse ring-4 ring-yellow-300' : ''}`}
                >
                  <img
                    src={friend.photo}
                    alt={friend.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className={`w-full h-full ${friend.color} rounded-full flex items-center justify-center ${friend.photo ? 'hidden' : 'flex'}`}>
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>

                  {isClicked && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center animate-bounce z-20">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  )}
                </button>
                
                {!isClicked && gameMode === 'points' && (
                  <div className="relative w-max max-w-full px-1 -mt-4 mx-auto" style={{ zIndex: 10 }}>
                    <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shadow-lg border border-white/20 text-center">
                      ???
                    </div>
                  </div>
                )}

                {isClicked && gameMode === 'points' && (
                  <div className="relative w-max max-w-full px-1 -mt-4 mx-auto" style={{ zIndex: 10 }}>
                    <div className={`${ballPoints[friend.id] >= 0 ? 'bg-green-600' : 'bg-red-600'} text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shadow-lg border border-white/20 text-center`}>
                      {ballPoints[friend.id] >= 0 ? '+' : ''}{ballPoints[friend.id]}
                    </div>
                  </div>
                )}

                {isClicked && gameMode === 'rating' && friendRatings[friend.id] && (
                  <div className="relative w-max max-w-full px-1 -mt-4 mx-auto" style={{ zIndex: 10 }}>
                    <div className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shadow-lg border border-white/20 text-center">
                      {friendRatings[friend.id]}/100
                    </div>
                  </div>
                )}
                
                <p className="text-white font-semibold mt-3 text-sm text-center">
                  {friend.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Final celebration */}
      {showCelebration && (
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className={`${gameMode === 'points' && score >= 0 ? 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-500' : gameMode === 'points' ? 'bg-gradient-to-r from-red-400 via-orange-500 to-pink-500' : 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500'} rounded-3xl p-8 shadow-2xl animate-gentle-bounce`}>
            <div className="flex justify-center gap-4 mb-6">
              {gameMode === 'points' ? (
                score >= 0 ? (
                  <>
                    <Trophy className="w-16 h-16 text-white animate-spin" />
                    <Cake className="w-16 h-16 text-white animate-pulse" />
                    <Trophy className="w-16 h-16 text-white animate-spin" />
                  </>
                ) : (
                  <>
                    <ThumbsDown className="w-16 h-16 text-white animate-bounce" />
                    <Cake className="w-16 h-16 text-white animate-pulse" />
                    <ThumbsDown className="w-16 h-16 text-white animate-bounce" />
                  </>
                )
              ) : (
                <>
                  <Award className="w-16 h-16 text-white animate-spin" />
                  <Cake className="w-16 h-16 text-white animate-pulse" />
                  <Award className="w-16 h-16 text-white animate-spin" />
                </>
              )}
            </div>

            {gameMode === 'points' ? (
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {score >= 0 ? '¡GANASTE! 🎊' : '¡PERDISTE! 😅'}
                </h2>
                <p className="text-white text-xl mb-6">
                  {score >= 0 
                    ? '¡Felicidades! Terminaste con puntos positivos' 
                    : '¡No te preocupes! La diversión fue lo importante'
                  }
                </p>
                <div className="bg-white/20 rounded-2xl p-6 mb-6">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className={`text-3xl font-bold mb-2 ${score >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                        {score}
                      </p>
                      <p className="text-white text-sm">Puntos Finales</p>
                    </div>
                    <div>
                      <p className="text-yellow-200 text-3xl font-bold mb-2">
                        {collectedStars}
                      </p>
                      <p className="text-white text-sm">⭐ Bonus</p>
                    </div>
                    <div>
                      <p className="text-red-200 text-3xl font-bold mb-2">
                        {collectedCurses}
                      </p>
                      <p className="text-white text-sm">⚡ Maldiciones</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  ¡CALIFICACIONES COMPLETAS! 🏆
                </h2>
                <p className="text-white text-xl mb-6">
                  Has calificado todas las felicitaciones de tus amigos
                </p>
                <div className="bg-white/20 rounded-2xl p-6 mb-6">
                  <div className="mb-6">
                    <p className="text-yellow-200 text-4xl font-bold mb-2">
                      {(Object.values(friendRatings).reduce((a, b) => a + b, 0) / Object.values(friendRatings).length).toFixed(1)}/100
                    </p>
                    <p className="text-white text-lg">Promedio General</p>
                  </div>

                  {getBestRatedFriend() && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-500/30 rounded-xl p-4">
                        <h4 className="text-white font-bold mb-2">🏆 Mejor Felicitación</h4>
                        <div className="flex items-center gap-3">
                          <img
                            src={getBestRatedFriend().photo}
                            alt={getBestRatedFriend().name}
                            className="w-12 h-12 object-cover rounded-full"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                          <div className={`w-12 h-12 ${getBestRatedFriend().color} rounded-full flex items-center justify-center ${getBestRatedFriend().photo ? 'hidden' : 'flex'}`}>
                            {React.createElement(getBestRatedFriend().icon, { className: "w-6 h-6 text-white" })}
                          </div>
                          <div>
                            <p className="text-white font-bold">{getBestRatedFriend().name}</p>
                            <p className="text-green-200">{Math.max(...Object.values(friendRatings))}/100 puntos</p>
                          </div>
                        </div>
                      </div>

                      {getWorstRatedFriend() && getBestRatedFriend().id !== getWorstRatedFriend().id && (
                        <div className="bg-red-500/30 rounded-xl p-4">
                          <h4 className="text-white font-bold mb-2">📉 Necesita Mejorar</h4>
                          <div className="flex items-center gap-3">
                            <img
                              src={getWorstRatedFriend().photo}
                              alt={getWorstRatedFriend().name}
                              className="w-12 h-12 object-cover rounded-full"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'flex';
                              }}
                            />
                            <div className={`w-12 h-12 ${getWorstRatedFriend().color} rounded-full flex items-center justify-center ${getWorstRatedFriend().photo ? 'hidden' : 'flex'}`}>
                              {React.createElement(getWorstRatedFriend().icon, { className: "w-6 h-6 text-white" })}
                            </div>
                            <div>
                              <p className="text-white font-bold">{getWorstRatedFriend().name}</p>
                              <p className="text-red-200">{Math.min(...Object.values(friendRatings))}/100 puntos</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={shareMessage}
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                <Share className="w-5 h-5 inline mr-2" />
                ¡Compartir Resultado!
              </button>
              <button
                onClick={resetGame}
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                <RotateCcw className="w-5 h-5 inline mr-2" />
                Jugar de Nuevo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message modal */}
      {showMessage && selectedFriend && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl transform animate-gentle-bounce max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6 flex flex-col items-center relative">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-pulse overflow-hidden relative">
                <img
                  src={selectedFriend.photo}
                  alt={selectedFriend.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={`w-full h-full ${selectedFriend.color} rounded-full flex items-center justify-center ${selectedFriend.photo ? 'hidden' : 'flex'}`}>
                  {React.createElement(selectedFriend.icon, { className: "w-10 h-10 text-white" })}
                </div>
                {/* Speaker button */}
                <button
                  onClick={() => toggleSpeech(selectedFriend.message)}
                  className="absolute bottom-0 right-0 bg-white/80 hover:bg-white/100 rounded-full p-2 shadow-lg transition-colors duration-300"
                  aria-label={isSpeaking ? "Detener audio" : "Reproducir audio"}
                >
                  {isSpeaking ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.54 8.46a5 5 0 010 7.07" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.07 4.93a9 9 0 010 14.14" />
                    </svg>
                  )}
                </button>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Mensaje de {selectedFriend.name} 💌
              </h3>
              {gameMode === 'points' && (
                <p className={`font-bold text-lg ${ballPoints[selectedFriend.id] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {ballPoints[selectedFriend.id] >= 0 ? '+' : ''}{ballPoints[selectedFriend.id]} puntos
                </p>
              )}
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {selectedFriend.message}
              </p>
            </div>

            <div className="text-center">
              {gameMode === 'points' ? (
                <button
                  onClick={() => setShowMessage(false)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  ¡Gracias por la felicitación! 💝
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowMessage(false);
                    setShowRatingModal(true);
                  }}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  ¡Calificar esta Felicitación! ⭐
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rating modal */}
      {showRatingModal && selectedFriend && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl transform animate-gentle-bounce">
            <div className="text-center mb-6">
              <Star className="w-16 h-16 mx-auto mb-4 text-yellow-500 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Califica la felicitación de {selectedFriend.name}
              </h3>
              <p className="text-gray-600">
                ¿Qué tal te pareció su mensaje?
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Malo</span>
                <div className="text-4xl font-bold text-yellow-500">
                  {currentRating}/100
                </div>
                <span className="text-sm text-gray-500">Excelente</span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={currentRating}
                  onChange={(e) => setCurrentRating(parseInt(e.target.value))}
                  className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #ef4444 0%, #f59e0b ${(currentRating - 1) / 99 * 100}%, #10b981 ${(currentRating - 1) / 99 * 100}%)`
                  }}
                />
              </div>
              
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>1</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleRatingSubmit}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 mr-4"
              >
                Confirmar Calificación ⭐
              </button>
              <button
                onClick={() => {
                  setShowRatingModal(false);
                  setCurrentRating(50);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/Parchís - Cumpleaños feliz (128kbit_AAC).mp4"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 4px solid #eab308;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 4px solid #eab308;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default BirthdayGame;