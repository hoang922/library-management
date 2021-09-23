const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv').config({path: './.env'});
const { sequelize } = require('./config/DBconfig');


//Global Middleware
app.use(express.json());
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.get('/' , (req, res) => {
    res.send('home page');
})

//Connect to Database
sequelize.authenticate()
    .then(() => {
        console.log('Connect to Database successfully!')
    })
    .catch((err) => {
        console.log(err);
    })

//Sync Database
sequelize.sync()
    .then(() => {
        console.log('Sync Done!!')
    })
    .catch(err => {
        console.log(err)
    })


//IMPORT ROUTER
require('./Route/index')(app);

const PORT = process.env.PORT || 3000   
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`); 
})