import { validToken } from "./validToken.mjs"
import express from "express"
import bodyParser from 'body-parser'
import { User, Todo } from "./db/User.mjs"
const router = express.Router()
router.use(bodyParser.json())
router.get('/', validToken, async (req,res)=>{
    const posts = await Todo.find({user: req.user._id}).sort('-date')
    res.json({content: posts})
}
)
router.post('/new', validToken, async (req,res)=>{
    try {
        const post = req.body.posts
        await Todo.create({message: post, user: req.user._id})
        return res.status(200).end()
}
catch(err){
    return res.status(400).json("Invalid input")
}
})
export {router}