const mongoose = require('mongoose')
const schema = mongoose.Schema

const commentSchema = new schema({
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user',
        required:true
    },
    text:{
        type:String,
        required:true
    },
    likes:{
        type:Array,
        default:[]
    }

},{timestamps:true})

const Comment = mongoose.model('comment',commentSchema)

module.exports = Comment