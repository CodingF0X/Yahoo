const mongoose = require('mongoose')
const schema = mongoose.Schema

const messageSchema = new schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        trim:true
    },
   chatId:{
    type:String,
    required:true
   }
},{timestamps:true})

const Message = mongoose.model('message',messageSchema)

module.exports = Message