
const mongoose = require('mongoose');


//SCHEMA CREATED
const manSchema = new mongoose.Schema({

    ranking : {
        type:Number,
        required: true,
        unique: true

    } ,
    name:{
        type:String,
        required: true,
        trim:true

    },
    dob:{
        type:Date,
        required: true,
        trim:true

    },
    country:{
        type:String,
        required: true,
        trim:true
    },
    score:{
        type:Number,
        required: true,
        trim:true
    },
    event:{
        type:String,
        default:"100m"
    
    }
});



// DEFINING COLLECTIONS

const MansRanking = new mongoose.model('MansRanking', manSchema);


module.exports = MansRanking;

