const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const connectMongo = require('./config/db');

dotenv.config({ path: './config/config.env'});

//passport config
require('./config/passport')(passport);

connectMongo();

const app = express();

//Body parser
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'));
}
//handlebar helpers
const {formatDate, stripTags, truncate } = require('./helpers/hbs');

//handlebars
app.engine('.hbs',exphbs({
    helpers: {
        formatDate,
        stripTags,
        truncate,
    },
     defaultLayout: 'main' ,
      extname: '.hbs'
    })
   );
app.set('view engine', '.hbs');

//Sessions
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))


//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));
app.use('/stories',require('./routes/stories'));
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.debug(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})