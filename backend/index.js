const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()

app.get('/', (req,res)=>{
    fetch('https://amazon.co.uk').then(item=>console.log(item)).catch(err=>console.log('Error',err))
})

app.listen(5000,()=>console.log('Started express server'))