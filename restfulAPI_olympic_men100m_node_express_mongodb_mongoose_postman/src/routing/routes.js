const express = require('express');
const router = new express.Router();

const MansRanking = require('../models/man');





//ROUTES

//POST ROUTE
router.post('/mens', async(req,res)=>{
   
    try{
     const record = new MansRanking(req.body);
     const result = await record.save();
 
     res.send(result);
 
    }catch(err){
        res.send(err);
 
    }
 });
 
 
 //GET ROUTE
 router.get('/mens', async(req,res)=>{
    
     try{
      const result  = await MansRanking.find();
  
      res.send(result);
  
     }catch(err){
         res.send(err);
  
     }
  });
 
 
  
 //GET ROUTE OF AN INDIVIUAL
 router.get('/mens/:id', async(req,res)=>{
    
     try{
 
         const _id = req.params.id;
 
      const result  = await MansRanking.find({_id:_id});
  
      res.send(result);
  
     }catch(err){
         res.send(err);
  
     }
  });
  
 
 //PATCH ROUTE OF AN INDIVIUAL
 router.patch('/mens/:id', async(req,res)=>{
    
     try{
 
         const _id = req.params.id;
 
      const result  = await MansRanking.findByIdAndUpdate({_id:_id}, req.body,{new:true});
  
      res.send(result);
  
     }catch(err){
         res.send(err);
  
     }
  });
 
 
  //DELETE ROUTE OF AN INDIVIUAL
 router.delete('/mens/:id', async(req,res)=>{
    
     try{
 
         const _id = req.params.id;
 
      const result  = await MansRanking.findByIdAndDelete({_id:_id});
  
      res.send(result);
  
     }catch(err){
         res.send(err);
  
     }
  });
 
 

  module.exports = router;
  