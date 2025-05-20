const { useState, useEffect } = React;

const cardImages = [
  'Bpanther.jpg','Bpanther.jpg',
  'Capt.jpg','Capt.jpg',
  'Hulk.jpg','Hulk.jpg',
  'Ironman.jpg','Ironman.jpg',
  'Loki.jpg','Loki.jpg',
  'Spiderman.jpg','Spiderman.jpg',
  'Strange.jpg','Strange.jpg',
  'Thor.jpg','Thor.jpg'
];

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createDeck() {
  return shuffle(cardImages).map((img, index) => ({
    id: index,
    img,
    flipped: false,
    matched: false
  }));
}

function App() {
  const [cards, setCards] = useState(createDeck());
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    if (first !== null && second !== null) {
      const firstCard = cards[first];
      const secondCard = cards[second];
      if (firstCard.img === secondCard.img) {
        setCards(prev => prev.map((card, idx) =>
          idx === first || idx === second ? { ...card, matched: true } : card
        ));
        setMatchedPairs(prev => prev + 1);
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, flipped: false } : card
          ));
          resetTurn();
        }, 1000);
      }
    }
  }, [second]);

  const handleCardClick = index => {
    if (lock) return;
    if (cards[index].flipped || cards[index].matched) return;

    setCards(prev => prev.map((card, idx) =>
      idx === index ? { ...card, flipped: true } : card
    ));

    if (first === null) {
      setFirst(index);
    } else if (second === null) {
      setSecond(index);
      setLock(true);
    }
  };

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setLock(false);
  };

  const restartGame = () => {
    setCards(createDeck());
    setMatchedPairs(0);
    resetTurn();
  };

  useEffect(() => {
    const body = document.body;
    const dots = [];
    for (let i = 0; i < 200; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      dot.style.top = `${randomY}vh`;
      dot.style.left = `${randomX}vw`;
      const randomXDirection = Math.random() - 1;
      const randomYDirection = Math.random() - 1;
      dot.style.setProperty('--xDirection', randomXDirection);
      dot.style.setProperty('--yDirection', randomYDirection);
      const randomDuration = Math.random() * 3 + 2;
      dot.style.animationDuration = `${randomDuration}s`;
      body.appendChild(dot);
      dots.push(dot);
    }
    return () => {
      dots.forEach(dot => body.removeChild(dot));
    };
  }, []);

  useEffect(() => {
    if (matchedPairs === cardImages.length / 2) {
      setTimeout(() => alert('You Win!'), 500);
    }
  }, [matchedPairs]);

  return (
    React.createElement(React.Fragment, null,
      React.createElement('div', { className: 'cards' },
        React.createElement('div', { className: 'deck' },
          cards.map((card, index) =>
            React.createElement('div', {
              key: card.id,
              className: `hero${card.flipped || card.matched ? ' flipped' : ''}${card.matched ? ' matched' : ''}`,
              onClick: () => handleCardClick(index)
            },
              React.createElement('img', { src: 'img/Back.jpg', alt: 'Card Back', className: 'back' }),
              React.createElement('img', { src: `img/${card.img}`, alt: card.img, className: 'front' })
            )
          )
        )
      ),
      React.createElement('div', { className: 'game-controls' },
        React.createElement('div', { id: 'score' }, `Matched Pairs: ${matchedPairs}`),
        React.createElement('button', { id: 'restart', onClick: restartGame }, 'Restart Game')
      )
    )
  );
}

export default App;
