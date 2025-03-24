require('dotenv').config(); // 確保環境變量被加載
const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

const routes = require('./routes')

mongoose.connect(process.env.MONGODB_URI)


const db = mongoose.connection
db.on('error',() => console.log('MongoDB error'))
db.once('open', () => console.log('MongoDB success'))

app.engine('.hbs', engine({ extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extends: true}))
app.use(methodOverride('_method'))


app.use(routes)


app.listen(3000, ()=>{
    console.log('Server is running on port http:localhost3000')
})