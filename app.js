const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config(); // 確保環境變量被加載
const usePassport = require('./config/passport');

const routes = require('./routes');
require('./config/mongoose');

const app = express();

app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true,
  })
);

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

usePassport(app);

app.use(bodyParser.urlencoded({ extends: true }));
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on port http:localhost3000');
});
