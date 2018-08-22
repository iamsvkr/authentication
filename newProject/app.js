var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.sendFile('htmlFiles/register.html',{root: __dirname});
});

app.listen(3000,function(){
	console.log("server running");
});