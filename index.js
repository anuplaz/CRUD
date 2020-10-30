const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
var bodyParser = require('body-parser')

//Paths
const publicPath = path.join(__dirname,'public')
const viewPath = path.join(__dirname,'views')
const partialsPath = path.join(__dirname,'partials')

//Setting 
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine','hbs')
app.set('views', viewPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))

//Home
app.get('/',(req,res)=>{
    res.render('home', {title:"Home"})
})

//Create 
app.get('/create',(req, res)=>{
    res.render('create',{title:"Create"})    
})

app.post('/created',(req,res)=>{
    const users = loadUsers()
    const id = users.length
    uname=req.body.uname
    email=req.body.email
    users.push({
        id:id,
        name:uname,
        email:email
        })
    saveUsers(users)
    res.render('create',{title:'create',msg:'Created the record : ',username:uname })
})

//List

app.get('/list',(req,res)=>{
    const users = loadUsers()
    res.render('list', {title:'List',users:users})
})

//Delete
app.get('/delete/:id',(req,res)=>{
    const users = loadUsers()
    const id= req.params.id;
    const usersToKeep = users.filter((user)=> user.id !=id)
    saveUsers(usersToKeep)
    res.render('create', {msg:'Deleted', username:id})
})

//Update
app.get('/update/:id', (req,res)=>{
    const users = loadUsers()
    const id = req.params.id;
    const user = users.find((u)=> u.id ==id)
    res.render('update',{title:'Update', id:id, username:user.name, email:user.email})
})

app.post('/updated', (req, res) =>{
    const users = loadUsers()
    id=req.body.uid
    uname=req.body.uname
    email=req.body.email
    console.log(id);
    const usersToKeep = users.filter((user)=> user.id !=id)
    usersToKeep.push({
        id:id,
        name:uname,
        email:email
        })
    saveUsers(usersToKeep)
    res.render('create',{msg:'Updated', username:uname})
})

//Error
app.get('*',(req,res)=>{
    res.render('error', {title: "Error"})
})

//Server start
app.listen(PORT, ()=>{
    console.log("Application is running on " +PORT);
})

const loadUsers = () => {
    try {
        const dataBuffer = fs.readFileSync('users.json')
        const dataJson = dataBuffer.toString()
        const users= JSON.parse(dataJson)
        return users
    } catch (e) {
        console.error(e);
        return []
    }
}
const saveUsers = (users) => {
    const dataJson = JSON.stringify(users)
    fs.writeFileSync('users.json', dataJson)
}