/* This File contains the manager for the connection to the DATABASE */
// Dependencies
var mongoose = require("mongoose")
//Modules
var variables = require('./variables')
var functions = require('../functions/functions')

module.exports= {
    connect : () => {
        mongoose.connect(                                                               //This method establish the connection with the DATABASE
            variables.uriDB,                                                            //URI to the Database Server
            { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex:true }, //Options to avoid deprecated issues
            (err)=>{
                if (err)
                    functions.handleError('Ha ocurrido un error al conectarse con el Base de datos', err)
                else {
                    console.log('La conexión a la Base de datos ha sido exitosa')
                }
            }
        )
    },
    close: ()=>{                                                                        //This method close the connection to the DATABASE
        mongoose.connection.close(() => {
            console.log('Conexión con la base de datos cerrada');
            process.exit(0);
          })
    }
};