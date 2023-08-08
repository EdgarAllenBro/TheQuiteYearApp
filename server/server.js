const path = require('path')
const express = require('express')
const cors = require('cors');
const app = express()
const axios = require('axios')
const {games} = require('./games.json')
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(express.static('src'))

app.post('/cards', (req,res)=>{
    console.log(req.body)
    games.push(req.body)
    res.status(200).send('cards saved your code is '+ req.body.gameId)
})
app.get('/cards',async (req,res)=>{
    let newId = Math.random().toString(36).substring(2,7)
 let deck = await axios.get('http://localhost:5050/cards').then((res)=>res.data)
 deck.gameId = newId
 console.log(deck)
res.status(200).send(deck)
})
app.get('/cards/:gameId', (req,res)=>{
    let {gameId} = req.params
    let deck = games.filter((e)=> e.gameId = gameId )
    if(deck === []){
        res.status(200).send(false)
    }else{
    res.status(200).send(deck[0])
    }
})



app.listen(8080, ()=>{console.log('server live on 8080')})