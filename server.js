/*******************
 * Dependencies
 *******************/
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cors = require('cors')

/******************** 
 * Modules 
 ********************/
const { errorTypes } = require('./config/constants')
const variables = require('./config/variables')
const db = require('./config/db.js')
const functions = require('./functions/functions')
const users = require('./routes/users')
const debug = require('./middlewares/debug')
const auth = require('./middlewares/auth')
const noAuth = require('./middlewares/noAuth')
const user = require('./models/user')

const app = express();

/**
 * Middlewares 
    * Here are applied all the middlewares neccesaries to work
    * @module express.json is used to support JSON-encoded bodies
    * @module express.urlencoded is used to support URL-encoded bodies 
    *      The extended option allows to choose between parsing the URL-encoded data 
    *      with the querystring library (when false) or the qs library (when true).
    * @module cors is used to allow cors requests from all sites
    * @module noAuth is to avoid authentication from exceptions paths
    * @module auth is used to authenticate users by jwt
 */  
app.use(express.json());                            
app.use(express.urlencoded({ extended: true }));   
app.use(cors());                                    
app.use(noAuth);                                   
app.use(auth);                                      

/** 
 * Development Middlewares 
 *  This middlewares are only aplied in development environment set from System Environment Variables
 *  @module debug this module gets info about requests and print them into the console log
 */  
if (variables.env == 'dev'){
    app.use(debug) //Middleware to get info on console about the request
}
// Establish the connection to the DB
db.connect(); 

// Register Routes to '/api' path
app.use('/api',users)

// Register Routes to '/auth' path
app.post('/auth',async (req,res)=>{
    if(!req.body.username || !req.body.password){
        res.status(400).send( functions.handleError(errorTypes.reqValues.msg, errorTypes.reqValues.code ))                                  //if required values are not in the request's body
        return ;
    }        
    user.findOne({ username:req.body.username })                                                                                            // Get user by username
    .then((user)=> {  
        if(user)      
            bcrypt.compare(req.body.password, user.password, (err, isMatch)=>{                                                              // Compare given password with stored one
                if (err) throw err;
                let accessToken = '';
                if (isMatch){                                                                                                               //If Match token wich expires in 60 minutes is created, after that time user must login again
                    accessToken = jwt.sign({ username: user.username, role: user.role }, variables.secretTokenJWT, { expiresIn: '60m' })    //jwt needs to sign the generated access token to be valid
                    res.send({auth:isMatch,token:accessToken}) 
                }else
                    res.status(400).send( functions.handleError(errorTypes.noMatch.msg , errorTypes.noMatch.code ))                         //if password Doesn't Match send Bad Request
            })
        else{
            res.status(400).send( functions.handleError(errorTypes.notFound.msg , errorTypes.notFound.code ))                               //if Username doesn't exists send Bad Request
        }
            
    }).catch((err)=>{
        res.status(500).send(functions.handleError(`Ha ocurrido un error al autenticarse`,err))                                             //If any errors occurs while user is consulting
    });
})

// Init server
app.listen(variables.port, () => console.log(`Servidor Inicializado en el puerto '${variables.port}'`) );

// This work a watcher which close the DB connection when the API shuts down
process.on('SIGINT', db.close).on('SIGTERM', db.close);