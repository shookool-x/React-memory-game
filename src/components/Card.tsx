import './Card.css'

interface CardsLike {
  src: string,
  id: number,
  matched: boolean
}

interface CardProps {
  imgSrc: CardsLike,
  handleCover(src: CardsLike): void,
  rotate: boolean,
}

export default function Card({ imgSrc, handleCover, rotate }: CardProps) {
  return (
    <div className={`grid-item ${rotate ? 'rotate' : ''}`}>
      <img className="main-img" src={imgSrc.src} alt="no-image" />
      <img
        className="cover-img "
        onClick={() => { handleCover(imgSrc) }}
        src='/pics/cover4.jpeg'
        alt="no-image" />
    </div>
  )
}
