import {useState} from 'react'


export default function Deck(props){
    // console.log(Object.keys(props.deck.hearts).length)
const  [hearts, setHearts] = useState(props.deck.hearts)
const  [diamonds, setDiamonds] = useState(props.deck.diamonds)
const  [clubs, setClubs] = useState(props.deck.clubs)
const  [spades, setSpades] = useState(props.deck.spades)

const [currentCard,setCurrentCard] = useState({})

const drawCard = ()=>{
    if(Object.keys(hearts).length > 0){
    let randomNum = Math.floor(Math.random() * Object.keys(hearts).length)
        setCurrentCard(hearts[Object.keys(hearts)[randomNum]])
            delete hearts[Object.keys(hearts)[randomNum]]

    } else if(Object.keys(diamonds).length > 0){
    let randomNum = Math.floor(Math.random() * Object.keys(diamonds).length)
        setCurrentCard(diamonds[Object.keys(diamonds)[randomNum]])
            delete diamonds[Object.keys(diamonds)[randomNum]]

    } else if(Object.keys(clubs).length > 0){
    let randomNum = Math.floor(Math.random() * Object.keys(clubs).length)
        setCurrentCard(clubs[Object.keys(clubs)[randomNum]])
            delete clubs[Object.keys(clubs)[randomNum]]
    } else {
    let randomNum = Math.floor(Math.random() * Object.keys(spades).length)
        setCurrentCard(spades[Object.keys(spades)[randomNum]])
        if(Object.keys(spades)[randomNum] === 'king'){
            setSpades({})
        }
            delete spades[Object.keys(spades)[randomNum]]
    }
}
if(Object.keys(spades).length === 0){
    return  (<p>{currentCard.optionOne}</p>)
}
return (
    <>
    <button onClick={drawCard}>Draw Card</button>
<div id="currentCard">
<p>{currentCard.optionOne}</p>
<p hidden={!currentCard.optionTwo}>Or</p>
<p>{currentCard.optionTwo}</p>
</div>


    </>
)

}