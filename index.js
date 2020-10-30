const express = require('express')
const path = require('path')
const hbs = require('hbs')

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

//Home
app.get('/',(req,res)=>{
    res.render('home')
})

//Error
app.get('*',(req,res)=>{
    res.render('error')
})

//Server start
app.listen(PORT, ()=>{
    console.log("Application is running on " +PORT);
})