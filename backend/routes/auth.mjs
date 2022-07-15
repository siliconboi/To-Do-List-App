import express from 'express'
import bodyParser from 'body-parser'
import {User} from '../db/User.mjs'
import bcrypt from 'bcryptjs'
import assert from 'node:assert'
import jwt from 'jsonwebtoken'
const Authrouter = express.Router()

Authrouter.use(bodyParser.json())
Authrouter.post('/register', async (req,res)=>{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try{
    assert.match(req.body.password,/^[a-zA-Z0-9]{3,30}$/,"invalid password")
    const error = user.validateSync()
    const savedUser = await user.save()
    const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET, {expiresIn: "23h"})
    res.header('auth-token', token).json({token : token})
}
catch(err){
    res.status(400).send(err.message)
}
})

Authrouter.post('/login', async (req,res)=>{
    try{
    const validUser = await User.findOne({email : req.body.email})
    const validPass = await bcrypt.compare(req.body.password, validUser.password)
    if(!validPass){
        throw new Error
    }
    const token = jwt.sign({_id: validUser._id}, process.env.TOKEN_SECRET, {expiresIn: "23h"})
    res.header('auth-token', token).json({token: token})
}
catch(err){
    res.status(400).send("Invalid Input")
}
})
// Authrouter.get('/logout', (req,res)=>{
//    try{
//    const token = jwt.sign({}, process.env.TOKEN_SECRET, {expiresIn: "0.5"})
//    return res.header('auth-token', token).json({token: token})
//    }
//    catch(err){
//     return res.status(400).send("Invalid Input")
//    }
// })
 export {Authrouter}