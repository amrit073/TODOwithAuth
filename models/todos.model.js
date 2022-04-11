const mongoose = require('mongoose')
const Schema = mongoose.Schema


const todoSchema = new Schema({
    id : {type: Number},
    task : {type:String},
    isCompleted:{type:Boolean}
}, {timestamps:true})

const idSchema = new Schema({
googleId : {type : Number, required: true},
 todos : [todoSchema]
}, {timestamps : true})



const todo = mongoose.model('todo', idSchema)

module.exports = todo





