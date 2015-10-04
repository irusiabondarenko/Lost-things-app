var express = require('express');
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var nodemailer = require('nodemailer'); 
var MongoClient = mongodb.MongoClient;
var path = require('path');
var mongoUrl = 'mongodb://irusiabondarenko:35356Dnepr@ds042688.mongolab.com:42688/seekout';
var testData = [];

var myDB;

  MongoClient.connect(mongoUrl, function(err, db){
	  if(err) {
		 console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
		//HURRAY!! We are connected. :)
			console.log('Connection established to', mongoUrl);
      
			var collection = db.collection('lostThings');
			myDB = db;
	  }
	})	
			
			var app = express();

			app.use(express.static(__dirname));
			app.use(bodyParser.json());
			
			
			
			app.get('/', function (req, res) {
			  res.sendFile('map.html', {root:__dirname});
			});
            setTimeout(function(){ 
			app.get('/getdata', function(req, res){
				myDB.open(function(err,myDB) {
					myDB.collection('lostThings', function(err,collection){
						collection.find().toArray(function(err, items){
							res.send(items);
						})
					})
				})
				
			});
			}, 2000);

			app.post('/add', function(req, res){
				var realData = [];
				collection.insert(req.body, function(err, result){
					if(err) {
						console.log('Error inserting data into db');
					}
				});
				realData.push(req.body);
				res.send(realData);
				
			});

			app.post('/delete', function(req, res){
			
				var removeThing = req.body.unique_id;
			    collection.remove({'unique_id': removeThing})
				
			});
			
			app.post('/mail', function (req, res){
				
				var mailOpts, smtpTrans;
				
				smtpTrans = nodemailer.createTransport('SMTP', {
				  service: 'Gmail',
				  auth: {
					  user: "irusiabondarenko@gmail.com",
					  pass: "vfylfhbyf23" 
				  }
			  });
			  
			  mailOpts = {
				  to: 'irusiabondarenko@gmail.com',
				  text: req.body.message,
				  subject: "Feedback from Seek-out app!"
			  };
			  
			  
			  smtpTrans.sendMail(mailOpts, function (error, response) {
				  
				   if (error) {
						console.log(error);
					} else {
						console.log('Message sent');
					}
				});
			  res.send("success")
				
			})
			

			var port = process.env.PORT || 8080;
			var server = app.listen(port, function(){
			  var host = server.address().address;
			  var port = server.address().port;

			  console.log('Example app listening at http://%s:%s', host, port);
			});

		
