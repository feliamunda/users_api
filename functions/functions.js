/* This file contains common functions */

/***************
 * Modules
 **************/
const variables = require('../config/variables');


/**
 * @function handleError     This Function Standarize the error messages sended by the API as Response
 *      @param {String} msg  Message to the user   
 *      @param {any} error   Error
 * @returns {String}         JSON formated with message and error info
 */
const handleError = (msg,error)=>{                   
    let errorWithMsg = {msg, error}
    if (variables.env == 'dev')                 //If Enviroment is develop print errors
        console.error(errorWithMsg);    
    return errorWithMsg
}
/**
 * @function randomN            Generates a random number from 0 to (limit - 1) 
 *      @param {Number} limit   Limit number to consider top - 1 (Real Top) 
 * @returns {Number}            A Random Number
 */
const randomN = (limit)=>{
    return Math.floor(Math.random()*(limit))
}
/**
 * @function randomDate         Generate a random Date in a specific range
 *      @param {Date} start     Starting Date minimun
 *      @param {Date} end       Topp Date maximum
 * @returns 
 */
const randomDate = (start, end)=>{
    return new Date(start.getTime() + Math.random()*(end.getTime() - start.getTime()))
}

module.exports = {
    handleError,
    randomN,
    randomDate
}