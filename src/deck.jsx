import {useState} from 'react'
import axios from 'axios'

export default function Deck(props){
    // console.log(Object.keys(props.deck.hearts).length)
const  [hearts, setHearts] = useState(props.deck.hearts)
const  [diamonds, setDiamonds] = useState(props.deck.diamonds)
const  [clubs, setClubs] = useState(props.deck.clubs)
const  [spades, setSpades] = useState(props.deck.spades)
const  [gameId, setId] = useState(props.gameId)
const  [choices, setChoices] = useState(props.deck.choices || [])
const [currentCard,setCurrentCard] = useState({'suit':'blank','optionOne':'Draw'})

const submitOption = (evt)=>{
let choice = evt.target.innerHTML
if(choice != "Draw"){
setChoices([...choices,choice])}
drawCard()
}
const saveDeck = ()=>{
    console.log(choices)
 let body = {
        hearts: hearts,
        diamonds: diamonds,
        clubs:clubs,
        spades: spades,
        gameId: gameId,
        choices: choices
    }

axios.post('http://107.23.44.87:8080/cards', body).then((res)=>{
    alert(res.data)})

}

const drawCard = ()=>{
    if(Object.keys(hearts).length > 0){
    let randomNum = Math.floor(Math.random() * Object.keys(hearts).length)
        setCurrentCard({'classes':`hearts`,...hearts[Object.keys(hearts)[randomNum]]})
            delete hearts[Object.keys(hearts)[randomNum]]

    } else if(Object.keys(diamonds).length > 0){
    let randomNum = Math.floor(Math.random() * Object.keys(diamonds).length)
        setCurrentCard({'classes':`diamonds`,...diamonds[Object.keys(diamonds)[randomNum]]})
            delete diamonds[Object.keys(diamonds)[randomNum]]

    } else if(Object.keys(clubs).length > 0){
    let randomNum = Math.floor(Math.random() * Object.keys(clubs).length)
        setCurrentCard({'classes':`clubs`,...clubs[Object.keys(clubs)[randomNum]]})
            delete clubs[Object.keys(clubs)[randomNum]]
    } else {
    let randomNum = Math.floor(Math.random() * Object.keys(spades).length)
        setCurrentCard({'classes':`spades`,...spades[Object.keys(spades)[randomNum]]})
        if(Object.keys(spades)[randomNum] === 'king'){
            setSpades({})
        }
            delete spades[Object.keys(spades)[randomNum]]
    }
}
if(Object.keys(spades).length === 0){
    axios.delete(`http://107.23.44.87:8080/gameOver/${gameId}`).then(res=>console.log(res.data))
    return  (<p>{currentCard.optionOne}</p>)
}
return (
    <>
<div className={currentCard.classes} id="currentCard">
<p className='option' id='One' onClick={submitOption}>{currentCard.optionOne}</p>
<p hidden={!currentCard.optionTwo}>Or</p>
<p className='option' id='Two' onClick={submitOption}>{currentCard.optionTwo}</p>
</div>
<div id='choices'>
<button onClick={saveDeck}>Save?</button>
<h2>Your Choices</h2>
    {choices.map((e)=>{
       return <p>{e}</p>
    })}
</div>
    </>
)

}