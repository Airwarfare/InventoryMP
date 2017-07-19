var socket = io.connect('http://127.0.0.1:80');
var accesslevel = 0;
var carddata = null
socket.on('LoginSuccess', function (d) {
    document.getElementById('button').classList.remove('loading');
    $('.ui.sidebar')
        .transition('fade')
    ;   
    if(d.data.accesslevel == 0) {
        document.getElementById('profilerank').classList.add('user');    
    } else if(d.data.accesslevel == 1) {
        document.getElementById('profilerank').classList.add('users');
    } else if(d.data.accesslevel == 2){
        document.getElementById('profilerank').classList.add('star');
    }
    document.getElementById('profilerank').classList.add('icon');
    document.getElementById('profilename').textContent = d.data.username;
    accesslevel = d.data.accesslevel;
});
socket.on('LoginFail', function (data){
    document.getElementById('button').classList.remove('loading');
    var ul = document.getElementById("errorlist");
    var li = document.createElement("li");

    if(data.data == "BadPass") {
        document.getElementById("passinput").classList.add('error');
        li.appendChild(document.createTextNode("You have entered an incorrect password"));
        ul.appendChild(li);
        document.getElementById("errormessage").classList.remove('hidden');     
    }
    if(data.data == "BadEmail") {
        document.getElementById("emailinput").classList.add('error');
        li.appendChild(document.createTextNode("You have entered an incorrect email address"));
        ul.appendChild(li);
        document.getElementById("errormessage").classList.remove('hidden');
    }
});
socket.on('CardInfo', function(data){
    var arr = data.data
    carddata = arr
    var search = []
    for(var i = 0; i < data.data.length; i++) {
        search.push({title:arr[i].itemname})
    }
    for(var i = 0; i < data.data.length; i+=3) {
        var ar = [arr[i], arr[i+1], arr[i+2]]
        CreateCard(ar)
        console.log("T"+i)       
    }
    if(accesslevel == 2) {
        isAdmin()
    }
    $('.ui.search')
    .search({
        source: search
    })
    ;
});

$(document).ready(function() {
    $('.button').click(function() {
        var info = [document.getElementById('user').value, document.getElementById('pass').value];
        
        socket.emit('UserLogin', { data: info });
        document.getElementById('button').classList.add('loading');
        document.getElementById('emailinput').classList.remove('error');
        document.getElementById('passinput').classList.remove('error');
        var ul = document.getElementById("errorlist");
        if(!document.getElementById("errormessage").classList.contains('hidden')) {
            $('.message .close').closest('.message').transition('fade');
            while(ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
        }
    });
});
$('.message .close').on('click', function() {
    $(this).closest('.message').transition('fade');
});

function SignOut() {
    
};