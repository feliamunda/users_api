/* This file contains common functions */
//Dependencies
const variables = require('../config/variables')

const handleError = (msg,error)=>{                      //This Function Standarize the error messages sended by the API as Response
    let errorWithMsg = {msg, error}
    if (variables.env == 'dev')
        console.error(errorWithMsg);
    return errorWithMsg
}
module.exports = {
    handleError
}