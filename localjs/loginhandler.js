var socket = io.connect('http://localhost');
socket.on('LoginSuccess', function (data) {
    document.getElementById('button').classList.remove('loading');
    console.log("Good");
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
        document.getElementById('button').classList.add('loading');
        var info = [document.getElementById('user').value, document.getElementById('pass').value];
        document.getElementById('emailinput').classList.remove('error');
        document.getElementById('passinput').classList.remove('error');
        var ul = document.getElementById("errorlist");
        if(!document.getElementById("errormessage").classList.contains('hidden')) {
            $('.message .close').closest('.message').transition('fade');
            while(ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
        } 

        socket.on('for_client', function(data){
            socket.emit('UserLogin', { data: info });
        });
    });
});
$('.message .close').on('click', function() {
    $(this).closest('.message').transition('fade');
});