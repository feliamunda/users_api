// Dependencies
const express = require("express");

//Modules
const user = require("../models/user");
const functions = require('../functions/functions');
const { errorTypes } = require("../config/constants");

const router = express.Router();

router.get('/',(req,res)=>{                                                                                 //Method GET Handler
    if (!req.query.username){ // if Requested a List of users
        user.find().then(
            (docs)=>{
                if (docs)
                    res.send(docs);
                else
                    res.status(404).send(functions.handleError(errorTypes.notFound.msg,errorTypes.notFound.code));
            },
            (err)=>{
                res.status(500).send(functions.handleError(errorTypes.default.msg,err))
            }
        )
    }else{ // if Requested info from a single user
        user.findOne({username:req.query.username}).then(
            (doc)=>{
                if(doc)
                    res.send(doc);
                else
                    res.status(404).send(functions.handleError(errorTypes.notFound.msg,errorTypes.notFound.code))
            },
            (err)=>{
                res.status(500).send(functions.handleError(errorTypes.default.msg,err))
            }
        )
    }
})

router.post('/', async (req,res)=>{                                                                         //Method POST Handler
    let userExists = await user.exists({ $or : [{username: req.body.username},{email:req.body.email}] });   // Check if the username and email is already taken
    if (userExists) return res.status(400).send(functions.handleError(errorTypes.notUnique.msg,errorTypes.notUnique.code));    
    
    let newUser = new user(req.body);
    newUser.save().then(
        (doc)=>{
            docMod = doc
            docMod.password = req.body.password
            res.status(201).send(docMod);                                                                    //After Save send the created Doc modified to hide the encripted password
        },
        (err)=>{
            res.status(500).send(functions.handleError(errorTypes.default.msg,err))
        }
    )
})

router.put('/',(req,res)=>{                                                                                 //Method PUT Handler
    user.updateOne({username:req.query.username},req.body).then(                                            //Update the first record which match with the filter username
        (r)=>{
            res.status(200).send(r)
        },
        (err)=>{
            res.status(500).send(functions.handleError(errorTypes.default.msg,err))
        }
    )
})

router.delete('/',(req,res)=>{                                                                              //Method DELETE Handler
    user.deleteOne({username:req.query.username}).then(                                                     //Delete the first record which match with the filter username
        (r)=>{
            res.status(200).send(r)
        },
        (err)=>{
            res.status(500).send(functions.handleError(errorTypes.default.msg,err))
        }
    )
})

router.get('/exist',(req,res)=>{                                                                            //Method GET Handler to know if a user exists
    if (req.query.username){ 
        user.exists({username:req.query.username}).then(
            (exist)=>{
                res.send(exist);    // Send whereas value return from database if the user exists true and if not false 
            },
            (err)=>{
                res.status(500).send(functions.handleError(errorTypes.default.msg,err))
            }
        )
    }else{
        res.status(400).send(functions.handleError(errorTypes.reqValues.msg,errorTypes.reqValues.code))
    }
})

module.exports = router;