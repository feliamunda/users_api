// Dependencies
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cors = require('cors')

// Modules
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

// General Middlewares
app.use(express.json());                            // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));    // to support URL-encoded bodies
app.use(cors());                                    // to allow cors requests
app.use(noAuth);                                    // to no authenticate some paths
app.use(auth);                                      // to authenticated users by jwt

// Development Middlewares 
if (variables.env == 'dev'){
    app.use(debug) //Middleware to get info on console about the request
}

db.connect(); // Establish the connection to the DB

app.use('/api',users)

app.post('/auth',async (req,res)=>{
    if(!req.body.username || !req.body.password){
        res.status(400)
        .send( functions.handleError(errorTypes.reqValues.msg, errorTypes.reqValues.code )) //if required values are not in the request's body
        return ;
    }        
    user.findOne({ username:req.body.username }) // Get user by username
    .then((user)=> {  
        if(user)      
            bcrypt.compare(req.body.password, user.password, (err, isMatch)=>{ // Compare given password with stored one
                if (err) throw err;
                let accessToken = '';
                if (isMatch){ //If Match Create an set a cookie with a token wich expires in 60 minutes after that time user must login again
                    accessToken = jwt.sign({ username: user.username, role: user.role }, variables.secretTokenJWT, { expiresIn: '60m' })
                    res.send({auth:isMatch,token:accessToken})
                }else
                    res.status(400).send( functions.handleError(errorTypes.noMatch.msg , errorTypes.noMatch.code )) //if password Doesn't Match
            })
        else{
            res.status(400).send( functions.handleError(errorTypes.notFound.msg , errorTypes.notFound.code ))    //if Username doesn't exists
        }
            
    }).catch((err)=>{
        res.status(401).send(functions.handleError(`Ha ocurrido un error al autenticarse`,err))
    });
})

// Init server
app.listen(variables.port, () => console.log(`Servidor Inicializado en el puerto '${variables.port}'`) );

// Watcher to close the DB connection when the API shuts down
process.on('SIGINT', db.close).on('SIGTERM', db.close);

