const mongoose = require('mongoose');


mongoose.connect(("mongodb://localhost:27017/olympics"),
{ useCreateIndex:true , useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false})
.then(()=>{console.log("successfully connected to mongodb")})
.catch((err)=>{console.log("connection to mongodb not success")});


