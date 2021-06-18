const express = require('express');
const path = require('path');
const hbs = require('hbs');
require("./db/conn");
const User = require("./models/usermessage");

const port = process.env.PORT || 4004;
const app = express();

// SETTING UP PATHS
        // require core module path on top

const staticpath = path.join(__dirname,'../public' );
const viewspath = path.join(__dirname,'../templates/views');
const partialspath = path.join(__dirname,'../templates/partials' );

const bootstrappath = path.join(__dirname, '../node_modules/bootstrap/dist/css');
const jspath = path.join(__dirname, '../node_modules/bootstrap/dist/js');
const jqpath = path.join(__dirname, '../node_modules/jquery/dist');


//MIDDLEWARES

            //for bootstrap
app.use('/css', express.static(bootstrappath) );
            //for js
app.use('/js', express.static(jspath) );
            //for jq
app.use('/jq', express.static(jqpath) );
            

            // to make our app , what type of data is coming
app.use(express.urlencoded({extended:false}));
            //to inform the app that we are going to use static website from public folder, initially
app.use(express.static(staticpath));
            //set the view engine to hbs
app.set("view engine", 'hbs');
            //to inform app that change directory of views
app.set("views", viewspath);
            //to register partials
hbs.registerPartials(partialspath);











// ROUTING
app.get('/', (req,res)=>{
    res.render('index');

});



app.post('/contact',async (req,res)=>{

    try{
        //new document creation
        const userData = new User(req.body);


        await userData.save();
        res.render('index');


    }catch(err){
        res.send(err);
    }
})




// server listening
app.listen(port, ()=>{
    console.log(`server running successfully at port ${port}`);
});