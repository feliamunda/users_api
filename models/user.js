/* This Model Design User Structure */
// Dependencies
const mongoose = require("mongoose")
const moongoseBcrypt = require('mongoose-bcrypt')
//Modules
const functions = require('../functions/functions')

let userSchema =  new mongoose.Schema({                 //Define User Structure
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
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    age:{
        type: Number,
        required:true,
        min:0
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
userSchema.plugin(moongoseBcrypt);

const user = mongoose.model('User', userSchema);        //Creates the Model

user.find()                                             //If the DATABASE is empty create a defaul user
    .then((docs)=>{
        if (docs.length == 0){
            let userDefault = new user({
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
            userDefault.save()
        }
    }).catch((err)=>{
        functions.handleError('Error al Consultar los Registros', err)
    })

module.exports = user;