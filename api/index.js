/* eslint-disable import/no-extraneous-dependencies */
// creating server with express 
const express = require('express')
const path = require('path')

// configurations 
require("dotenv").config();
const morgan = require('morgan')
const cors = require('cors');
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const db = require('./config/database')
const logger = require('./logger');

// importing routes
const routes = require('./modules/v1/route_manager')


const options = {};
const app = express()
// Enable all CORS requests
app.use(cors())


// Setup server port
const PORT = process.env.PORT || 9000;

app.use(morgan('tiny'))

// Code to parse request body in text as well as json format
app.use(express.text());
app.use(bodyParser.json());

// importing ejs module to use ejs / html files
app.use(express.urlencoded({ extended: false}));



app.set('view engine', 'ejs');


app.use('/v1/authenticate',routes)
app.use('/v1/blog',routes)


// listen for requests
try {
    module.exports = app.listen(PORT, () => {
      logger.info(`Server is listening on port : ${PORT}`);
    });
    
  } catch (error) {
    logger.error("Failed to start server.",error);
  
  }