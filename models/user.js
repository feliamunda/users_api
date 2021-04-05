/* This Model Design User Model */

/*******************************
 * Dependencies
 *****************************/
const mongoose = require("mongoose")
const moongoseBcrypt = require('mongoose-bcrypt')
/*******************************
 * Modules
 *****************************/
const functions = require('../functions/functions')

/**
 * @var userSchema save a @module Schema object with this properties:
 * @property {String} username : is required must be unique value with minimun length 4 and maximun length 20, 
 *                               every value is in lowercase and erase white spaces
 * @property {String} name     : is required,
 * @property {String} lastName : is required
 * @property {Number} age      : is required with just integers positives values
 * @property {Date} birthday   : is required
 * @property {String} email    : is required with maximun length 50 and must be unique and whitout white spaces
 * @property {String} role     : by default value 'normal'
 * @property {Boolean} active  : by default a user is active
 * 
 */
let userSchema =  new mongoose.Schema({             
    username: {
        type: String,
        required : true,
        minLength: 4,
        maxlength: 20,
        lowercase: true,
        trim: true,
        unique: true
    },
    name:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        required:true,
        min:0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} No es un valor entero'
        }
    },
    birthday:{
        type: Date,
        required:true,
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        lowercase: true,
        trim: true,
        unique: true
    },
    role:{
        type: String,
        default: 'normal'
    },
    active: {
        type: Boolean,
        default: true
    }
},{ timestamps: true })

//Insert moogoseBycrypt as plugin in my user Schema 
userSchema.plugin(moongoseBcrypt);

//Validate email by Regex Match 
userSchema.path('email').validate(function (value) {
    return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/g)  
  }, 'No es un email válido');

//Creates the Model
const userModel = mongoose.model('User', userSchema);       


//If the DATABASE is empty create a default user admin with password admin
userModel.find()                                             
    .then((docs)=>{
        if (docs.length == 0){
            let user = new userModel({
                "username" : "admin",     
                "email":"admin@test.com",  
                "name":"Admin",
                "lastName":"Main",
                "age": 0 ,
                "birthday": new Date(1990,05,02).getTime(),                 
                "password" : "admin",      
                "role" : "admin", 
                "active": true
            })
            user.save().then(
                (r)=>console.log(r),
                (err)=>console.log(err)
            )
        }
    }).catch((err)=>{
        functions.handleError('Error al Consultar los Registros', err)
    })

/**
 * @function generateUsername        Creates a randomUsername from a string passed 
 *      @param {String} str          String to extract letters randomly
 *      @param {String[]} usersTaken List of user already generated 
 * @returns {String}                 Generated username from the original str
 */
const generateUsername = (str , usersTaken)=>{          
    newStr = ''
    for (let index = 0; newStr.length < 4 && !usersTaken.includes(newStr); index++) {
        newStr = (str).split('').filter(()=>Math.round(Math.random())).toString().replace(/,/g,'').toLowerCase()
    }
    usersTaken.push(newStr)
    return newStr
}

/**
 * @function mockingUsers   Generates Random user from a combination of lists names,lastaNames and password
 * @param {Number} n        Number of users to generate
 */   
const mockingUsers = (n)=>{            
    //Default Values
    const names = ['Juana', 'Carmen', 'Patricio', 'Cuarenzo', 'Virginia', 'Juan', 'Carlos', 'Carla', 'Pedro', 'Luis', 'Claire', 'John', 'Zeus', 'Pia', 'Husain' ]
    const lastNames = ['Cabrera', 'Superlano', 'Gomez', 'Camacho', 'Virgin', 'Duque', 'Arteaga', 'Lobos', 'Alban', 'Sarutobi', 'King', 'Calvin', 'Alves', 'Wu', 'Campanero']
    const passwords = ['pass','password','canela','launch','board']     
    let count = 0
    let usersTaken = []
    let users = []
    while (count < n) {
        nameG = names[functions.randomN(names.length)]
        lastNameG = lastNames[functions.randomN(names.length)]
        username = generateUsername(nameG+lastNameG,usersTaken)
        
        let newUser = {
            "username" : username,     
            "email":`${username}@testmocking.com`,  
            "name": nameG,
            "lastName":lastNameG,
            "age": functions.randomN(100) ,
            "birthday": functions.randomDate(new Date(1990,01,01), new Date(2020,01,01)),                 
            "password" : passwords[functions.randomN(passwords.length)],      
        }
        users.push(newUser)
        count++;
    }
    userModel.insertMany(users).then(
        (r)=>console.log(r),
        (err)=>console.log(err)
    )
    console.log('Usuarios Creados ', users)
}

// mockingUsers(78);       //Creates n Users

module.exports = userModel;