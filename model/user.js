const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserData = new Schema({

    userName:{
        type:String,
        required:true
    },
    accountNumber:{
        type:String,
        required:true
    },
    emailAddress:{
        type:String,
        required:true
    },
    identityNumber:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('userData',UserData)