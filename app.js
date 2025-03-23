require('dotenv').config(); // 確保環境變量被加載
const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')

const app = express()

const Todo = require('./models/todo')

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

app.use(bodyParser.urlencoded({extends: true}))


app.get('/', (req,res)=>{
    Todo.find()
        .lean()
        .then(
            todos => res.render('index',{todos})
        )
        .catch(error=> console.error(error))
})

app.get('/new', (req, res) => {
    return res.render('new')  
})

app.post('/todos', (req, res) =>{
    const name = req.body.name
    return Todo.create({name}).then(()=>{
        res.redirect('/')
    }).catch(error => console.error(error))
})

app.listen(3000, ()=>{
    console.log('Server is running on port http:localhost3000')
})