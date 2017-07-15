var socket = io.connect('http://127.0.0.1:80');
socket.on('LoginSuccess', function (d) {
    document.getElementById('button').classList.remove('loading');
    $('.ui.sidebar')
        .transition('fade')
    ;   
    CreateCard()
    if(d.data.accesslevel == 0) {
        document.getElementById('profilerank').classList.add('user');
    } else if(d.data.accesslevel == 1) {
        document.getElementById('profilerank').classList.add('users');
    } else if(d.data.accesslevel == 2){
        document.getElementById('profilerank').classList.add('star');
        isAdmin()
    }
    document.getElementById('profilerank').classList.add('icon');
    document.getElementById('profilename').textContent = d.data.username;
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

$(document).ready(function() {
    $('.button').click(function() {
        console.log("Fire");
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