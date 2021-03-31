const mongoose = require("mongoose")

const dbName = 'users_db'
const dbHost = 'localhost'

module.exports= {
    connect: ()=> mongoose.connect( `mongodb://${ dbHost }/${ dbName }`,
                                    { useNewUrlParser: true , useUnifiedTopology: true},    
                                    ()=>{'Ha ocurrido un error al Conectar con la Base de Datos'}),
    connection : ()=>{
        if (mongoose.connection)
            return mongoose.connection
        return mongoose.connect()  
    },
    dbName,
    model : mongoose.model
};