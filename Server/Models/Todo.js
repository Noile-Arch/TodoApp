const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    timestamp:{
        type:String,
        default:Date.now()
    }
})

const todos = mongoose.model("todos",Schema)

module.exports = todos