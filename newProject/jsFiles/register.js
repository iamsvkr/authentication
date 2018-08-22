var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

var Uname,email,password,b1;
app.use(bodyParser.urlencoded({ extended: true })); 
mongoose.connect("mongodb://localhost/new_user");

var userSchema = new mongoose.Schema({
	Uname : String,
	Email : String,
	Password : String,
	books : Array
});

var User = mongoose.model("User",userSchema);

app.get('/',function(req,res){
	res.sendFile('htmlFiles/home.html',{root: __dirname});
});

app.get('/register',function(req,res){
	res.sendFile('htmlFiles/register.html',{root: __dirname});
});

app.post('/register',function(req,res){
	uname = req.body.Uname;
	email = req.body.email;
	password = req.body.password;

	var u1 = new User({
		Uname : uname,
		Email : email,
		Password : password
	});

	u1.save(function(err,user){
		if(err){
			console.log("wrong");
		}else{
			console.log("added successfully");
			//console.log(user);
			//res.send("added");
			res.redirect('/');
		}
	});
});

app.get('/login',function(req, res){
	res.sendFile('htmlFiles/login.html',{root: __dirname});

});

app.post('/login',function(req,res){
	email = req.body.email;
	password = req.body.password;
	//res.send(email);

	User.find({
		Email : email,
		Password : password
	}).exec(function(err,users){
		if (err){ 
			throw err;
		}
		else if(users === {}){
			res.redirect('/register');
		}
		else{
			res.send(users);
			//res.redirect('/books');
		}
	});

});

app.get('/books',function(req,res){
	res.sendFile('htmlFiles/books.html',{root:__dirname});
});

app.post('/books',function(req,res){
	b1 = req.body.booksEnter;
	User.update({Email:email},{$push:{books:b1}});
});

app.listen(3000,function(){
	console.log("server running");
});