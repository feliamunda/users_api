// Dependencies
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// Modules
const variables = require('./config/variables')
const db = require('./config/db.js')
const users = require('./routes/users')
const debug = require('./middlewares/debug')
const auth = require('./middlewares/auth')
const user = require('./models/user')

const app = express();

// General Middlewares
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// Development Middlewares 
if (variables.env == 'dev'){
    app.use(debug) //Middleware to get info on console about the request
}

db.connect(); // Establish the connection to the DB

app.use('/api/',auth,users)

app.get('/auth',async (req,res)=>{
    user.findOne({ username:req.body.username }) // Get user by username
    .then((user)=> {      
        if (user){    
            bcrypt.compare(req.body.password, user.password, (err, isMatch)=>{ // Compare given password with stored one
                if (err) throw err;
                console.log('La contraseña coincide :', isMatch); 
                if (isMatch){ //If Match Create an set a cookie with a token wich expires in 60 minutes after that time user must login again
                    let accessToken = jwt.sign({ username: user.username, role: user.role }, variables.secretTokenJWT, { expiresIn: '60m' })
                    res.cookie('AuthToken',accessToken)
                }
                res.send(isMatch)
            });
        }else{
            res.send(false)
        }
    }).catch((err)=>{
        res.status(401).send(functions.handleError(`Ha ocurrido un error al autenticarse`,err))
    });
})

// Init server
app.listen(variables.port, () => console.log(`Servidor Inicializado en el puerto '${variables.port}'`) );

// Watcher to close the DB connection when the API shuts down
process.on('SIGINT', db.close).on('SIGTERM', db.close);

