require('dotenv').config(); // 確保環境變量被加載
const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars');

const app = express()

mongoose.connect(process.env.MONGODB_URI)


// if(process.env.Node_ENV !=='production'){
//     require('dotenv').config()
// }

const db = mongoose.connection
db.on('error',() => console.log('MongoDB error'))
db.once('open', () => console.log('MongoDB success'))

app.engine('.hbs', engine({ extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


app.get('/', (req,res)=>{
    res.render('index')
})

app.listen(3000, ()=>{
    console.log('Server is running on port http:localhost3000')
})