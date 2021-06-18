const mongoose = require('mongoose');

const validator = require('validator');


//CREATE A SCHEMA
const userSchema = mongoose.Schema({

    
    name:{
        type:String,
        required:true,
        minLength:3

    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email ID');
            }
        }

    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        min:10
        

    },
    message:{
        type:String,
        required:true,
        minLength:3
      

    },
    date:{
        type:Date,
        default:Date.now
    }
    
});


//CREATE A COLLECTION
const User = mongoose.model('User', userSchema );


//Export collection

module.exports = User;