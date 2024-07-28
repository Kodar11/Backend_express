import express from 'express'
import 'dotenv/config'
const app = express()

const port = process.env.PORT || 3000

// app.get('/',(req,res)=> {
//     res.send("Hey Its Kodar11")
// })
// app.get('/login',(req,res)=> {
//     res.send("Login page")
// })
// app.get('/sign-up',(req,res)=> {
//     res.send("Sign up page")
// })

app.use(express.json())

let listData = []
let id = 1

app.post('/teas',(req,res)=> {
    const {name, price} = req.body
    const newData = {id:id++,name,price}
    listData.push(newData)
    res.status(201).send(newData)
})

// get all data
app.get('/teas',(req,res)=>{
    res.status(201).send(listData)
})
// get data with provided id
app.get('/teas/:id',(req,res)=>{
    const tea = listData.find((t) => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("tea not found")
    }
    return res.status(201).send(tea)
})

// update data 
app.put('/teas/:id',(req,res)=>{
    const tea = listData.find((t) => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("tea not found")
    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(201).send(tea)
})

// delete
app.delete('/teas/:id',(req,res)=>{
    const index = listData.findIndex((t) => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("tea not found")
    }
    listData.splice(index,1)
    res.status(201).send('deleted')
})



app.listen(port, ()=>{
    console.log(`Server is running at the port : ${port}`);
})