/*****************
 *  Dependencies
 * ***************/ 
const express = require("express");

/*****************
 *    Modules
 ***************/ 
const user = require("../models/user");
const functions = require('../functions/functions');
const { errorTypes } = require("../config/constants");

//Create a router
const router = express.Router();                                                                            
/**
 * This Method Hadle GET type request for '/api/' path
 *      If @var req.query.username doesn't exist means that the request is for all users but
 *      if it's exists the request is only for one specific user both methods are using @module user 
 *      to do the search just with differents methods
 */
router.get('/',(req,res)=>{               
    if (!req.query.username){
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
/**
 * This Method Hadle POST type request for '/api/' path
 *      First Check if the username or email is already taken, if not create a new user from @module user 
 *      and after saving it send the created document modified to hide the encripted password and show the same value received
 */
router.post('/', async (req,res)=>{                                                                        
    let userExists = await user.exists({ $or : [{username: req.body.username},{email:req.body.email}] }); 
    if (userExists) return res.status(400).send(functions.handleError(errorTypes.notUnique.msg,errorTypes.notUnique.code));    
    
    let newUser = new user(req.body);
    newUser.save().then(
        (doc)=>{
            docMod = doc
            docMod.password = req.body.password
            res.status(201).send(docMod);                                                                    
        },
        (err)=>{
            res.status(500).send(functions.handleError(errorTypes.default.msg,err))
        }
    )
})
/**
 * This Method Hadle PUT type request for '/api/' path
 *      Just use @module user to update the first record which match with the filter username 
 */
router.put('/',(req,res)=>{  
    if (req.query.username){ 
        user.updateOne({username:req.query.username},req.body).then(                                            //Update the first record which match with the filter username
            (r)=>{
                res.status(200).send(r)
            },
            (err)=>{
                res.status(500).send(functions.handleError(errorTypes.default.msg,err))
            }
        )
    }else{
        res.status(400).send(functions.handleError(errorTypes.reqValues.msg,errorTypes.reqValues.code))
    }                                                                               
})
/**
 * This Method Hadle PUT type request for '/api/' path
 *      Just use @module user to delete the first record which match with the filter username 
 */
router.delete('/',(req,res)=>{    
    if (req.query.username){ 
        user.deleteOne({username:req.query.username}).then(                                                
            (r)=>{
                res.status(200).send(r)
            },
            (err)=>{
                res.status(500).send(functions.handleError(errorTypes.default.msg,err))
            }
        )
    }else{
        res.status(400).send(functions.handleError(errorTypes.reqValues.msg,errorTypes.reqValues.code))
    }                                                                       
})
/**
 * This Method Hadle GET type request for '/api/exist' path
 *      First check if username is in the request then check if exists by @module user and send the response 
 *      if user exists true and if not false 
 */
router.get('/exist',(req,res)=>{                                                                            
    if (req.query.username){ 
        user.exists({username:req.query.username}).then(
            (exist)=>{
                res.send(exist);  
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