const mongoose = require('mongoose');

//Creating a database
mongoose.connect("mongodb://localhost:27017/responsiveDynamicWebsiteDB",
{useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("connected to mongodb successfully");
})
.catch((err)=>{
    console.log(err);
})
