import React, { useState, useEffect, useRef } from 'react';
import { Gift, Heart, Star, Sparkles, PartyPopper, Cake, Volume2, VolumeX, RotateCcw, Share } from 'lucide-react';

const BirthdayGame = () => {
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
  const [specialEffects, setSpecialEffects] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const audioRef = useRef(null);

  const friends = [
    {
      id: 1,
      name: "María",
      color: "bg-pink-400",
      message: "¡Feliz cumpleaños! Eres una persona increíble y estoy muy agradecida de tenerte en mi vida. Que este nuevo año te traiga muchas aventuras y momentos felices. ¡Te quiero mucho! 🎉💕",
      icon: Heart,
      points: 10,
      photo: "/photos/maria.jpg"
    },
    {
      id: 2,
      name: "Carlos",
      color: "bg-blue-400",
      message: "¡Hey cumpleañero/a! Espero que tengas un día fantástico lleno de risas y buena comida. Gracias por ser un amigo tan genial y por todos los buenos momentos que hemos compartido. ¡A celebrar! 🎂🎈",
      icon: Gift,
      points: 15,
      photo: "/photos/carlos.jpg"
    },
    {
      id: 3,
      name: "Ana",
      color: "bg-green-400",
      message: "¡Felicidades en tu día especial! Eres una de las personas más divertidas que conozco. Que cumplas muchos más años llenos de salud, amor y éxito. ¡Disfruta tu día al máximo! ✨🌟",
      icon: Star,
      points: 25,
      photo: "/photos/ana.jpg"
    },
    {
      id: 4,
      name: "Pedro",
      color: "bg-yellow-400",
      message: "¡Cumpleaños feliz! Me alegra mucho poder celebrar contigo otro año de vida. Eres una persona especial que siempre sabe cómo hacer sonreír a los demás. ¡Que tengas un día maravilloso! 🎊🎁",
      icon: PartyPopper,
      points: 12,
      photo: "/photos/pedro.jpg"
    },
    {
      id: 5,
      name: "Laura",
      color: "bg-purple-400",
      message: "¡Feliz cumple! Gracias por ser tan buena persona y por todos los momentos increíbles que hemos vivido juntos. Espero que este nuevo año de vida esté lleno de nuevas oportunidades y mucha felicidad. 💜🎯",
      icon: Sparkles,
      points: 30,
      photo: "/photos/laura.jpg"
    },
    {
      id: 6,
      name: "Diego",
      color: "bg-red-400",
      message: "¡Qué tengas un cumpleaños espectacular! Eres una persona única y especial. Que este año te traiga todo lo que deseas y más. ¡Vamos a celebrar como se debe! 🔥🎸",
      icon: Cake,
      points: 18,
      photo: "/photos/diego.jpg"
    },
    {
      id: 7,
      name: "Sofia",
      color: "bg-indigo-400",
      message: "¡Feliz cumpleaños querido/a! Tu amistad significa mucho para mí. Eres alguien en quien siempre puedo confiar. Que tengas un año lleno de bendiciones y momentos hermosos. 💙🦋",
      icon: Heart,
      points: 22,
      photo: "/photos/sofia.jpg"
    },
    {
      id: 8,
      name: "Miguel",
      color: "bg-orange-400",
      message: "¡Cumpleaños feliz! Espero que tu día esté lleno de sorpresas maravillosas. Gracias por ser un amigo tan leal y divertido. ¡Que celebres muchos cumpleaños más! 🧡🎭",
      icon: Gift,
      points: 16,
      photo: "/photos/miguel.jpg"
    },
    {
      id: 9,
      name: "Carmen",
      color: "bg-teal-400",
      message: "¡Feliz cumple! Eres una persona extraordinaria con un corazón enorme. Me siento afortunada de conocerte. Que este nuevo año de vida esté lleno de amor, risas y aventuras. 💚🌺",
      icon: Star,
      points: 28,
      photo: "/photos/carmen.jpg"
    },
    {
      id: 10,
      name: "Javier",
      color: "bg-cyan-400",
      message: "¡Felicidades! Otro año más de vida para celebrar todo lo increíble que eres. Gracias por ser un amigo tan genial y por todos los buenos ratos. ¡A disfrutar este día especial! 🎨🎪",
      icon: PartyPopper,
      points: 20,
      photo: "/photos/javier.jpg"
    },
    {
      id: 11,
      name: "Isabel",
      color: "bg-rose-400",
      message: "¡Feliz cumpleaños! Eres una persona muy especial que siempre ilumina el día de los demás. Que este nuevo año te traiga mucha paz, amor y todas las cosas buenas que mereces. 🌸✨",
      icon: Sparkles,
      points: 35,
      photo: "/photos/isabel.jpg"
    }
  ];

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
    setScore(prev => prev + friend.points);

    // Animación especial para la bolita
    setBallAnimations(prev => ({
      ...prev,
      [friend.id]: 'animate-spin'
    }));

    // Mostrar mensaje después de que termine la animación de rotación
    setTimeout(() => {
      setShowMessage(true);
      setBallAnimations(prev => ({
        ...prev,
        [friend.id]: ''
      }));
    }, 1000);

    // Confetti y efectos
    generateConfetti(50);
    generateSpecialEffect('celebration', x, y);

    // Estrellas aleatorias
    if (Math.random() < 0.4) {
      setCollectedStars(prev => prev + 1);
      generateSpecialEffect('star', x, y);
    }

    // Activar modo mágico con ciertos amigos
    if (friend.points >= 25) {
      setMagicMode(true);
      setTimeout(() => setMagicMode(false), 3000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    generateConfetti(80);
    if (musicEnabled && audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    // Scroll to top on game start
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetGame = () => {
    setClickedBalls(new Set());
    setGameStarted(false);
    setShowMessage(false);
    setSelectedFriend(null);
    setScore(0);
    setCollectedStars(0);
    setMagicMode(false);
    setBallAnimations({});
    setSpecialEffects([]);
    setShowCelebration(false);
  };

  const shareMessage = () => {
    const message = `¡Acabo de recibir una felicitación de cumpleaños interactiva! 🎉 Leí ${clickedBalls.size}/11 mensajes de mis amigos y obtuve ${score} puntos de felicidad. #FelizCumpleanos`;
    if (navigator.share) {
      navigator.share({ text: message });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(message);
      alert('¡Mensaje copiado al portapapeles!');
    } else {
      alert(message);
    }
  };

  // Mostrar celebración final cuando se leen todos los mensajes
  useEffect(() => {
    if (clickedBalls.size === friends.length && !showCelebration) {
      setShowCelebration(true);
      generateConfetti(100);
      setMagicMode(true);
      setTimeout(() => setMagicMode(false), 5000);
    }
  }, [clickedBalls.size, showCelebration, friends.length]);

  // Controlar la reproducción de audio cuando cambia musicEnabled
  useEffect(() => {
    if (audioRef.current) {
      if (musicEnabled && gameStarted) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicEnabled, gameStarted]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 shadow-2xl max-w-lg w-full text-center">
          <Cake className="w-24 h-24 mx-auto mb-6 text-yellow-300 animate-bounce" />
          
          <h1 className="text-5xl font-bold text-white mb-4 titulo_feliz_cumple">
            ¡FELIZ CUMPLEAÑOS Miguel! 🎂
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Tus amigos han preparado mensajes especiales para ti. 
            <br/>
            <span className="font-semibold text-yellow-200">
              ¡Descubre cada felicitación haciendo clic en sus bolitas!
            </span>
          </p>
          
          <div className="bg-white/10 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">🎮 ¿Cómo funciona?</h3>
            <ul className="text-white/80 space-y-2 text-left">
              <li>• Haz clic en cada bolita de color</li>
              <li>• Lee los mensajes de tus 11 amigos</li>
              <li>• Colecciona puntos de felicidad</li>
              <li>• Disfruta de los efectos especiales</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-2xl shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse"
          >
            ¡EMPEZAR LA CELEBRACIÓN! 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 relative overflow-hidden titulo_segunda_pantalla ${magicMode ? 'animate-pulse' : ''}`}>
      {/* Efectos especiales */}
      {specialEffects.map((effect) => (
        <div
          key={effect.id}
          className="fixed pointer-events-none z-40"
          style={{ left: effect.x, top: effect.y, transform: 'translate(-50%, -50%)' }}
        >
          {effect.type === 'celebration' && <div className="text-6xl animate-ping">🎉</div>}
          {effect.type === 'star' && <div className="text-4xl animate-spin">⭐</div>}
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

      {/* Header de felicitación */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-bounce">
             ¡FELIZ CUMPLEAÑOS! 
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Haz clic en las bolitas para descubrir los mensajes de tus amigos
          </p>
        </div>

        {/* Panel de progreso */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-white">
                <Heart className="w-6 h-6 text-pink-300" />
                <span className="font-bold text-lg">{score} puntos de felicidad</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Star className="w-6 h-6 text-yellow-300" />
                <span className="font-bold">{collectedStars} estrellas</span>
              </div>
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

          {/* Barra de progreso */}
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-700 flex items-center justify-center"
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

      {/* Grid de bolitas de amigos */}
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
                  {/* Fallback con icono si la imagen no carga */}
                  <div className={`w-full h-full ${friend.color} rounded-full flex items-center justify-center ${friend.photo ? 'hidden' : 'flex'}`}>
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>

                  {isClicked && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center animate-bounce z-20">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  )}
                </button>
                {!isClicked && (
                  <div className="relative w-max max-w-full px-1 -mt-4 mx-auto" style={{ zIndex: 10 }}>
                    <div className="bg-black/60 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shadow-lg border border-white/20 text-center">
                      +{friend.points}
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

      {/* Mensaje de celebración final */}
      {showCelebration && (
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-3xl p-8 shadow-2xl animate-gentle-bounce">
            <div className="flex justify-center gap-4 mb-6">
              <PartyPopper className="w-16 h-16 text-white animate-spin" />
              <Cake className="w-16 h-16 text-white animate-pulse" />
              <PartyPopper className="w-16 h-16 text-white animate-spin" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ¡INCREÍBLE! 🎊
            </h2>
            <p className="text-white text-xl mb-6">
              ¡Has leído todos los mensajes de felicitación de tus amigos!
            </p>
            <div className="bg-white/20 rounded-2xl p-6 mb-6">
              <p className="text-white text-2xl font-bold mb-2">
                🎯 {score} Puntos de Felicidad
              </p>
              <p className="text-white text-lg">
                ⭐ {collectedStars} Estrellas Coleccionadas
              </p>
              <p className="text-white/90 text-lg mt-4">
                ¡Esperamos que tengas un cumpleaños fantástico lleno de alegría y momentos especiales! 🎂✨
              </p>
            </div>
            <button
              onClick={shareMessage}
              className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg mr-4 transition-all duration-300 transform hover:scale-105"
            >
              <Share className="w-5 h-5 inline mr-2" />
              ¡Compartir mi Cumpleaños!
            </button>
            <button
              onClick={resetGame}
              className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5 inline mr-2" />
              Ver Mensajes de Nuevo
            </button>
          </div>
        </div>
      )}

      {/* Modal del mensaje */}
      {showMessage && selectedFriend && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl transform animate-gentle-bounce max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-pulse overflow-hidden">
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
                  <selectedFriend.icon className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Mensaje de {selectedFriend.name} 💌
              </h3>
              <p className="text-green-600 font-bold text-lg">
                +{selectedFriend.points} puntos de felicidad
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {selectedFriend.message}
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowMessage(false)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                ¡Gracias por la felicitación! 💝
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Elemento de audio oculto */}
      <audio
        ref={audioRef}
        src="/Parchís - Cumpleaños feliz (128kbit_AAC).mp4"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default BirthdayGame;
