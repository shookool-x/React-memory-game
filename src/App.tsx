import './App.css';
import { useState, useEffect } from 'react'
import Card from './components/Card';

const cardImages = [
  { src: '/pics/j1.jpeg', matched: false },
  { src: '/pics/j2.jpeg', matched: false },
  { src: '/pics/j3.jpeg', matched: false },
  { src: '/pics/j4.jpeg', matched: false },
  { src: '/pics/j5.jpeg', matched: false },
  { src: '/pics/j6.jpeg', matched: false },
]

interface CardsLike {
  src: string,
  id: number,
  matched: boolean
}

export default function App() {

  if (window.localStorage.getItem('record') === null) {
    window.localStorage.setItem('record', '0');
  }

  const [card, setCards] = useState<CardsLike[]>([]);
  const [turn, setTurn] = useState<number>(0);
  const [ch1, setCh1] = useState<CardsLike | null>(null);
  const [ch2, setCh2] = useState<CardsLike | null>(null);
  const [disable, setDisable] = useState(true)

  // all useEffects : 

  useEffect(() => {
    cardShuffle()
  }, [])

  useEffect(() => {
    if (ch1 && ch2) {
      setDisable(false)
      if (ch2.src === ch1.src) {
        setCards(prevCard => (
          prevCard.map(card => {
            if (card.src === ch1.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        ))
        resIncrese()
      } else {
        setTimeout(() => resIncrese(), 1000);
      }
    }
  }, [ch1, ch2])


  return (
    <div className='App'>
      <h1>حافظه تصویری خودتو بسنج!</h1>
      <button onClick={cardShuffle}>بازی جدید</button>
      <span>تا الان -{turn}- بار تلاش کردی</span>

      <div className='card-grid'>
        {
          card.map(card =>
          (<Card
            key={card.id}
            imgSrc={card}
            handleCover={handleChoice}
            rotate={card.matched || ch1 === card || ch2 === card}
          />))
        }
      </div>
    </div>
  )

  // Functions :

  function cardShuffle() {
    const shCards = [...cardImages, ...cardImages];

    for (let i = shCards.length - 1; i >= 0; i--) { // use knuth-shuffle for shuffle cardds
      const j = Math.floor(Math.random() * (i + 1));
      [shCards[i], shCards[j]] = [shCards[j], shCards[i]];
    }
    const addedId = shCards.map(item => ({ ...item, id: Math.random() }));

    setCh1(null);
    setCh2(null);
    setTurn(0);
    setCards(addedId);
  }

  // reset choices and increase turn
  function resIncrese() {
    setCh1(null);
    setCh2(null);
    setTurn(prevTurn => ++prevTurn);
    setDisable(true);
  }

  function handleChoice(card: CardsLike) {
    if (disable) {
      ch1 ? setCh2(card) : setCh1(card);
    }
  }
}
