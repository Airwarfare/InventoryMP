    fs = require('fs');
var express= require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser')
var crypto = require('crypto');
var mysql = require('mysql');
var http = require('http').createServer(app);
var io = require('socket.io').listen(80);


app.use(express.static(__dirname + '/semantic/dist/'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/localjs'));
app.use(bodyParser());
app.use(cors());
//app.use(require('socket.io'));

app.get('/', function(req, res){
      res.sendFile(path.join(__dirname + '/index.html'));
});


io.sockets.on('connection', function (socket) {
    console.log("Connect");
    socket.emit('for_client', { data: 'random'});
    socket.on('UserLogin', function(data) {
        ValidateUser(data);
    });
});

http.listen(3000, '127.0.0.1');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test123',
  database : 'nodeproject'
});


var randomSeed = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex')
            .slice(0,length);
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        value
    };
};

function HashPassword(userpassword) {
    var salt = randomSeed(16);
    var passwordData = sha512(userpassword, salt);
    return {
        salt:salt,
        hash:passwordData
    }
}


connection.connect(function(err){
    if(err) throw err;
});

function ValidateUser(UserData)
{
    console.log("DB");
    console.log(UserData.data);
    MySqlGenericQuery("SELECT * FROM userinfo WHERE email = '" + UserData.data[0] + "'", function(err, data){
        if(err) {
            console.log("ERROR:  ",err);
        }
        else if(!data)
        {
            io.emit('LoginFail', { data: 'BadEmail'});
        }
        else {
            var passhash = sha512(UserData.data[1], data.salt);
            if(UserData.data[0] == data.email && passhash.value == data.passwordhash)
            {
                console.log("User is validated!");
                console.log(data);
                io.emit('LoginSuccess', { data: data});
            }
            else 
            {
                if(UserData.data[0] != data.email)
                {
                    io.emit('LoginFail', { data: 'BadEmail'});
                }
                if(passhash.value != data.passwordhash)
                {
                    io.emit('LoginFail', { data: 'BadPass'});
                }
            }
        }
    });
}

function MySqlGenericQuery(sql, callback) {
    connection.query(sql, function(err, rows, fields){
        if(err)
            callback(err, null);
        else
            callback(null, rows[0]);
    })
}