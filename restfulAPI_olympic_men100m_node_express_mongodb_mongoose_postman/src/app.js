const express = require('express');
//requiring db/conn.js
require('./db/conn');
const MansRanking = require('./models/man');
const manRouter = require('./routing/routes');

const port = process.env.PORT || 7000 ; 

const app = express();


app.use(express.json());

app.use(manRouter);


// //ROUTES

// //POST ROUTE
// app.post('/mens', async(req,res)=>{
   
//    try{
//     const record = new MansRanking(req.body);
//     const result = await record.save();

//     res.send(result);

//    }catch(err){
//        res.send(err);

//    }
// });


// //GET ROUTE
// app.get('/mens', async(req,res)=>{
   
//     try{
//      const result  = await MansRanking.find();
 
//      res.send(result);
 
//     }catch(err){
//         res.send(err);
 
//     }
//  });


 
// //GET ROUTE OF AN INDIVIUAL
// app.get('/mens/:id', async(req,res)=>{
   
//     try{

//         const _id = req.params.id;

//      const result  = await MansRanking.find({_id:_id});
 
//      res.send(result);
 
//     }catch(err){
//         res.send(err);
 
//     }
//  });
 

// //PATCH ROUTE OF AN INDIVIUAL
// app.patch('/mens/:id', async(req,res)=>{
   
//     try{

//         const _id = req.params.id;

//      const result  = await MansRanking.findByIdAndUpdate({_id:_id}, req.body,{new:true});
 
//      res.send(result);
 
//     }catch(err){
//         res.send(err);
 
//     }
//  });


//  //DELETE ROUTE OF AN INDIVIUAL
// app.delete('/mens/:id', async(req,res)=>{
   
//     try{

//         const _id = req.params.id;

//      const result  = await MansRanking.findByIdAndDelete({_id:_id});
 
//      res.send(result);
 
//     }catch(err){
//         res.send(err);
 
//     }
//  });


 

 




app.listen(port, ()=>{
    console.log(`server successfully running at port ${port}`)
});