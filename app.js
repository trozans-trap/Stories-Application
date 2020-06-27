const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectMongo = require('./config/db');

dotenv.config({ path: './config/config.env'});

connectMongo();

const app = express();

if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'));
}

//handlebars
app.engine('.hbs',exphbs({ defaultLayout: 'main' , extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/',require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.debug(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})