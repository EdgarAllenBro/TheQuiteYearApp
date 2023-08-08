import './App.css';
import Deck from './deck';
import {useState,useEffect} from 'react'
import axios from 'axios';

let SERVER_URL = "http://localhost:8080"
function App() {

const [landing,setLanding] = useState(true)
const [deck,setDeck] = useState({})
const [gameId,setId] = useState('')

const getCards = async ()=>{
  let {data} = await axios.get(SERVER_URL + '/cards')
  setDeck(data.cards)
  setId(data.gameId)
}
const newGame = async()=>{
 await getCards()
  setLanding(false)
}
const resumeGame = async ()=>{
  if(gameId === ''){
    alert('you need to enter a code')
  }else{
  await axios.get(`${SERVER_URL}/cards/${gameId}`).then((res)=>{
    console.log(res.data)
    if(!res.data){
      alert("not a valid code")
    }else{
    setDeck(res.data)
    setId(res.data.gameId)
    setLanding(false)
    }
  })
}}
const changeId = (evt)=>{
  setId(evt.target.value)
}

if(landing){
  return (<>
    <header id='header'>
      The Quiet Year
    </header>
  <button id='newGame' onClick={newGame}>New Game?</button>
  <button id='resume' onClick={resumeGame}>Resume?</button>
  <input id='gameSesh' onChange={changeId} placeholder='insert code' ></input>
  </>
)}
  return (
    <div id="App">
      <header id='header'>
      The Quiet Year
      </header>
<main>
<Deck deck={deck} gameId={gameId}/>
</main>
    </div>
  );
}

export default App;
