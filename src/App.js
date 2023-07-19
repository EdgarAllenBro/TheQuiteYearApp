import './App.css';
import Deck from './deck';
import {useState,useEffect} from 'react'
import axios from 'axios';

let baseURL = 'http://localhost:5050';

function App() {

const [isLoading,setLoading] = useState(true)
const [deck,setDeck] = useState({})
const getCards = ()=>{
  axios.get(baseURL + '/cards').then((res)=>{
    let {cards} = res.data
    setDeck(cards)
    setLoading(false)
    }
  )

}

useEffect(()=>{getCards()
},[])


if(isLoading){
  return <>
    <div id='loading'>...Loading</div>
  </>
}
  return (
    <div id="App">
      <header id='header'>
      The Quiet Year
      </header>
<main>
<Deck deck={deck}/>
</main>
    </div>
  );
}

export default App;
