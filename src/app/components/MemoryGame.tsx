import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const FLAGS = ["🇺🇸", "🇬🇧", "🇯🇵"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardPairs = FLAGS.flatMap((emoji, index) => [
      { id: index * 2, emoji, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, emoji, isFlipped: false, isMatched: false },
    ]);
    
    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  // Play 8-bit sound
  const playSound = (type: 'flip' | 'match' | 'win') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'square'; // 8-bit sound
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    if (type === 'flip') {
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'match') {
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } else if (type === 'win') {
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.15);
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    
    playSound('flip');
    
    const newCards = cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);
      
      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found
        playSound('match');
        setTimeout(() => {
          const matchedCards = newCards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          );
          setCards(matchedCards);
          setFlippedCards([]);
          
          // Check if game is won
          if (matchedCards.every(c => c.isMatched)) {
            playSound('win');
            setIsWon(true);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = newCards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-end justify-between h-full">
      <div className="text-right">
        <p 
          className="text-sm mb-1"
          style={{ 
            fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
            color: 'rgba(255, 255, 255, 0.7)'
          }}
        >
          Flag Memory Game
        </p>
        <p 
          className="text-xs mb-4"
          style={{ 
            fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
            color: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          Moves: {moves}
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="relative w-14 h-14 rounded-lg cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
            whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
            whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
          >
            <motion.div
              className="absolute inset-0 rounded-lg flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
              animate={{
                rotateY: card.isFlipped || card.isMatched ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Back of card */}
              <div
                className="absolute inset-0 rounded-lg flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <span style={{ fontSize: '20px' }}>🎴</span>
              </div>
              
              {/* Front of card */}
              <div
                className="absolute inset-0 rounded-lg flex items-center justify-center"
                style={{
                  background: card.isMatched 
                    ? 'rgba(34, 197, 94, 0.2)' 
                    : 'rgba(255, 255, 255, 0.15)',
                  border: card.isMatched 
                    ? '1px solid rgba(34, 197, 94, 0.5)' 
                    : '1px solid rgba(255, 255, 255, 0.3)',
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <span style={{ fontSize: '28px' }}>{card.emoji}</span>
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>
      
      <div className="flex flex-col items-end mt-4">
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-2"
            >
              <p 
                className="text-xs text-right"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  color: 'rgba(34, 197, 94, 1)'
                }}
              >
                🎉 You won in {moves} moves!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={initializeGame}
          className="px-4 py-2 rounded-lg transition-all hover:opacity-80"
          style={{ 
            fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontSize: '12px',
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
}
