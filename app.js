'use strict';

var express = require('express'),
	fs = require('fs'),
	sqlite =  require('sqlite3').verbose(),
	bodyParser = require('body-parser');	

var app = express();
	
var file = 'address.db';
var exists = fs.existsSync(file);

var db = new sqlite.Database(file);

db.serialize(function(){
	if(!exists){
		db.run("CREATE TABLE Address (url TEXT, port INTEGER)");

		var statement = db.prepare("INSERT into Address VALUES ('', '')");
		statement.run();
		statement.finalize();
	}
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(request, response){
	getAddress(function(address){
		var redirect =  address.url;
		// if(address.port){
		// 	redirect =  address.url + ':' + address.port
		// }else{
		// 	redirect =  address.url;
		// }
		response.redirect(redirect);
	});
	//response.redirect('http://192.168.25.27:8005');
})
.get('/config',function(request, response){
	getAddress(function(address){	
		response.render('index.jade', address);
	});
})
.post('/config', function(request, response){
	var url = request.body.url;
	// var port = request.body.port;
	if(url >''){
		db.serialize(function(){
			db.exec("DELETE FROM Address; INSERT INTO Address (url) VALUES ('" + url + "');", function(err){
				if(err){
					console.log(err);
				}
				getAddress(function(address){	
					response.render('index.jade', address);
				});
			});
		});
	}else{

		getAddress(function(address){	
			response.render('index.jade', address);
		});
	}
})
.listen(8081);

function getAddress(callback){
	db.serialize(function(){
		db.get('SELECT url from Address', function(err, address){
			if(err){
				return;
			}
			callback(address);
		});
	});
}

console.log('Server running at http://127.0.0.1:8081');
