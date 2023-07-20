import {useState} from 'react'


export default function Deck(props){
    // console.log(Object.keys(props.deck.hearts).length)
const  [hearts, setHearts] = useState(props.deck.hearts)
const  [diamonds, setDiamonds] = useState(props.deck.diamonds)
const  [clubs, setClubs] = useState(props.deck.clubs)
const  [spades, setSpades] = useState(props.deck.spades)

const [currentCard,setCurrentCard] = useState({'suit':'blank','optionOne':'Click card to draw'})

const drawCard = ()=>{
    if(Object.keys(hearts).length > 0){
    let card = Math.floor(Math.random() * Object.keys(hearts).length)
        setCurrentCard({'classes':`hearts`,...hearts[Object.keys(hearts)[card]]})
            delete hearts[Object.keys(hearts)[card]]

    } else if(Object.keys(diamonds).length > 0){
    let card = Math.floor(Math.random() * Object.keys(diamonds).length)
        setCurrentCard({'classes':`diamonds`,...diamonds[Object.keys(diamonds)[card]]})
            delete diamonds[Object.keys(diamonds)[card]]

    } else if(Object.keys(clubs).length > 0){
    let card = Math.floor(Math.random() * Object.keys(clubs).length)
        setCurrentCard({'classes':`clubs`,...clubs[Object.keys(clubs)[card]]})
            delete clubs[Object.keys(clubs)[card]]
    } else {
    let card = Math.floor(Math.random() * Object.keys(spades).length)
        setCurrentCard({'classes':`spades`,...spades[Object.keys(spades)[card]]})
        if(Object.keys(spades)[card] === 'king'){
            setSpades({})
        }
            delete spades[Object.keys(spades)[card]]
    }
    console.log(currentCard)
}
if(Object.keys(spades).length === 0){
    return  (<p>{currentCard.optionOne}</p>)
}
return (
    <>
<div onClick={drawCard} className={currentCard.classes} id="currentCard">
<p>{currentCard.optionOne}</p>
<p hidden={!currentCard.optionTwo}>Or</p>
<p>{currentCard.optionTwo}</p>
</div>
    </>
)

}