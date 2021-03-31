const { Schema, model } = require("mongoose")

const userSchema =  new Schema({ 
    username: {
        type: String,
        required : true,
        unique: true
    },
    password: String,
    age: Number ,
    active : {
        type: Boolean,
        default: true
    }
})

const user = model('User', userSchema);

module.exports = user;