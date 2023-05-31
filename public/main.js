/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global __dirname */
var express = require("express"); 
var fs = require("fs"); 
var path = require("path"); 
var bodyParser = require("body-parser");
var app = express(); 

app.use(express.static('public'));
app.use(express.static('files'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.info('App running at http://localhost:3000'));

app.get('/', (request, response) => response.sendFile(__dirname + '/index.html'));
app.get('/index.html', (request, response) => response.sendFile(__dirname + '/index.html')); 
app.get('/about.html', (request, response) => response.sendFile(__dirname + '/about.html')); 
app.get('/ourwork.html', (request, response) => response.sendFile(__dirname + '/ourwork.html')); 
app.get('/gallery.html', (request, response) => response.sendFile(__dirname + '/gallery.html')); 
app.get('/getinvolved.html', (request, response) => response.sendFile(__dirname + '/getinvolved.html')); 
app.get('/contactus.html', (request, response) => response.sendFile(__dirname + '/contactus.html')); 
app.get('/success.html', (request, response) => response.sendFile(__dirname + '/success.html')); 
app.get('/css/stylesheet.css', (request, response) => response.sendFile(__dirname + '/css/stylesheet.css')); 
app.get('/feedback.html', (request, response) => response.sendFile(__dirname + '/feedback.html')); 

app.get('/getFeedback', (request, response) => {     
    var mysql      = require('mysql');     
    var connection = mysql.createConnection({         
        host     : 'db4free.net', // add         
        user     : 'thomasthetank', // add         
        password : 'Get2it$$', // add         
        database : 'rossouwshooting' // add     
        });     
    connection.connect();       
    var sql = "SELECT * FROM Messages";     
    connection.query(sql,(err, rows, fields) => {         
        if (err) throw err;         
        response.json(rows);     
    }); 
});        
app.use(bodyParser.urlencoded({ extended: false })); 
 
app.post('/process', (request, response) => {     
    var name = request.body.FirstName;     
    var surname = request.body.LastName;     
    var message  = request.body.Message;     
    var email  = request.body.Email;         
    console.log(name + " " + surname);     
    console.log(email);     
    console.log(message);  
    
    var emailMessage = "New message from " + name + " " + surname + "(" + email + ") : " + message;     
    mail(emailMessage);
    
    db(name, surname, email, message); 
    
    response.sendFile(__dirname + '/success.html'); 
});
function mail(emailMessage){     
var nodemailer = require('nodemailer');    
var transporter = nodemailer.createTransport({         
   service: 'gmail',          
   auth: {             
   user: 'thomasrossouw@gmail.com', // add username             
   pass: 'Showmethe$4' // add password         
   }     
   });     
   var mailOptions = {         
   from: 'thomasrossouw@gmail.com', // add sender email (my email)        
   to: 'thomasrossouw@gmail.com', // add recipient email (maybe a friend)         
   subject: 'Message from Node.js app',         
   html: '<p>' + emailMessage + '</p>'     };     
   transporter.sendMail(mailOptions, function(error, info){        
   if (error) {             
       console.log(error);         
   } else {             
       console.log('Email sent: ' + info.response);         
   }     
   }); 
   }
function db(name, surname, email, message){     
var mysql = require('mysql');     
var connection = mysql.createConnection({         
    host     : 'db4free.net', // add         
    user     : 'thomasthetank', // add         
    password : 'Get2it$$', // add         
    database : 'rossouwshooting' // add     
    }); 
    
    connection.connect();    
    
    var sql = "INSERT INTO Messages (Name, Surname, Email, Message) VALUES ('"+name+"','"+surname+"','"+email+"','"+message+"')";    
    connection.query(sql,function (err, result) {         
        if (err) throw err;         
        console.log("Records inserted");     
    }); 
}
