const express = require('express');

const db = require('./config/db.js')
const user = require('./models/user')

const app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

try {
    db.connect()
} catch (err) {
    console.log('No es Posible conectarse a la BD / Error : ', err)
}

app.get('/',(req,res)=>{
    if (!req.query.username){
        user.find()
        .then((docs)=>{
            res.send(docs);
        }).catch((err)=>
            res.send({msg:'Ocurrió un error al Consultar los Datos', err})
        );
    }else{
        user.findOne({username:req.query.username})
        .then((docs)=>{
            res.send(docs);
        }).catch((err)=>
            res.send({msg:'Ocurrió un error al Consultar los Datos',error:err}))
    }
    
})

app.post('/',(req,res)=>{
    let newUser = new user(req.body);
    newUser.save()
        .then((r)=>{
            res.send(r)
        }).catch((err)=>
            res.send({msg:'Ocurrió un error al Crear el usuario', error:err})
        );
})

app.put('/',(req,res)=>{
    user.updateOne({username:req.query.username},req.body)
    .then((r)=>{
        res.send(r)
    }).catch((err)=>
        res.send({msg:'Ocurrió un error al Actualizar el usuario', error:err})
    );
})

app.delete('/',(req,res)=>{
    user.deleteOne({username:req.query.username})
    .then((r)=>{
        res.send(r)
    }).catch(()=>
        res.send({msg:'Ocurrió un error al Eliminar el usuario', error:err})
    );
})

app.listen(3000,()=>console.log('Servidor Iniciado'));