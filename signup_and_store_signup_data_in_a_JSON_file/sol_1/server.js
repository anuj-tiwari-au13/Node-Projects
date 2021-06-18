const express = require("express");
const app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const PORT = process.env.PORT || 8383;
app.use(express.static('public'));


app.get("/",function(req,res){

    res.sendFile("index.html");
})

app.post("/Register", function (req, res) {
	var user = {
		name: req.body.user_name,
		email: req.body.email,
		password: req.body.pwd
	};
	// userData.push(user);
	console.log(user);
	fs.readFile("users.json", { encoding: "utf-8" }, (err, data) => {
		if (err) return res.status(500).send("server error");
		var datas = JSON.parse(data);
		datas.push(user);
		fs.writeFile("users.json", JSON.stringify(datas), (err, data) => {
			if (err) return res.status(500).send("server error");
		});
        res.send(datas)
	});
    
});


app.listen(PORT,function(){
    console.log(`Server is running at port no ${PORT}`);
})