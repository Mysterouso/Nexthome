const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())

const differentTime = () =>  new Date();
const differentTime1 = () => new Date();


const fakeComments = [
    {
        name:"hi",
        date: new Date(),
        comment:"Makes no sense"
    },
    {
        name:"bye",
        date: new Date(),
        comment:"Peacefully kept"
    },
    {
        name:"hoho",
        date:new Date(),
        comment:"Brigading the last of us"
    }

]




app.get('/', (req,res)=>{
    res.status(200).send('hi')
})

app.post('/comments',(req,res)=>{
    res.status(200).json(fakeComments)
    
})



app.listen(5000,()=>console.log('Listening on port 5000'))