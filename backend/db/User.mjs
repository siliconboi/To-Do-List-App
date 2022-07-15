import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     name:{
        type:String,
        required: true
     },
     email:{
        type:String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
     },
     password:{
        type: String,
        required: true
     }
})
const todoSchema = new mongoose.Schema({
   message: {
     type: String,
     required: true,
     unique: true
   },
   user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
   },
   date:{
      type: Date,
      default: Date.now
   }
})
 
 
const Todo = mongoose.model('todo', todoSchema)

const User = mongoose.model('user', userSchema)

export {User, Todo}