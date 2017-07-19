function InputUIHandle(input) {
  var parent = input.parentElement;
  var elements = parent.children;
  var contents = parent.parentElement;
  var card = contents.parentElement;
  if(accesslevel >= 1) {
    if(isNaN(input.value)) {
      parent.classList.add("error");
      card.children[card.children.length-1].classList.remove("hidden");
    }
    else {
      if(parent.classList.contains("error")) {
        parent.classList.remove("error");
        card.children[card.children.length-1].classList.add("hidden");
      }
    }

    if(elements[2].children[0].classList.contains("hidden") && input.value != "" && card.children[card.children.length - 1].classList.contains("hidden")) {
      $(elements[2].children[0]).transition('slide down');
      $(elements[2].children[1]).transition('slide down');
      $(card.children[card.children.length-2]).transition('slide down');
      card.children[card.children.length-2].style = "height:40px !important";
      return;
    }

    if(!elements[2].children[0].classList.contains("hidden") && input.value == "") {
      $(elements[2].children[0]).transition('slide down');
      $(elements[2].children[1]).transition('slide down');
      $(card.children[card.children.length-2]).transition('slide down');
      card.children[card.children.length-2].style = "";
      return;
    }
  }
}

function CreateCard(data) {
  var root = document.body.children[3];
  var amount = 3
  while(!(amount <= 0)) {
    var a = 3;
    if(amount <= 2) {
      a = amount;
    }
    var current = root.appendChild(document.createElement("div"));
    current.classList.add("ui", "three", "cards");
    for (var i = 0; i < a; i++) {
      if(data[i] == null) {
        return;
      }
      //Card
      var card = current.appendChild(document.createElement("div"));
      card.classList.add("ui", "card");
      //Image
      var image = card.appendChild(document.createElement("div"));
      image.classList.add("image");

        var img = image.appendChild(document.createElement("img"));
        img.src = data[i].itempictureloc;
        img.style = "width: 278.66px !important; height: 271.69px !important;"
      //Content
      var content =  card.appendChild(document.createElement("div"));
      content.classList.add("content");

        var header = content.appendChild(document.createElement("header"));
        header.classList.add("header");
        header.textContent = data[i].itemname

        var meta = content.appendChild(document.createElement("div"));
        meta.classList.add("meta");
        meta.textContent = data[i].itemamount

        if(accesslevel >= 1) {
        var inputgroup = content.appendChild(document.createElement("div"));
        inputgroup.classList.add("ui", "input", "right", "margin");

          var textbox = inputgroup.appendChild(document.createElement("input"));
          textbox.type = "text";
          textbox.placeholder = "Enter Amount...";
          textbox.style = "width:160px";
          textbox.setAttribute("oninput", "InputUIHandle(this)");

          var space = inputgroup.appendChild(document.createElement("div"));
          space.classList.add("searchpad");

          var buttongroup = inputgroup.appendChild(document.createElement("div"));
          buttongroup.classList.add("ui", "buttons", "top");
          
            var button1 = buttongroup.appendChild(document.createElement("button"));
            button1.classList.add("ui", "red", "basic", "button", "icon", "transition", "hidden");
            button1.setAttribute("onClick", "currentObjectAmount(-1, this)")
            
              var icon1 = button1.appendChild(document.createElement("i"));
              icon1.classList.add("minus", "icon");

            var button2 = buttongroup.appendChild(document.createElement("button"));
            button2.classList.add("ui", "green", "basic", "button", "icon", "transition", "hidden");
            button2.setAttribute("onClick", "currentObjectAmount(1, this)")

              var icon2 = button2.appendChild(document.createElement("i"));
              icon2.classList.add("plus", "icon");
          }
      if(accesslevel == 2) {
      var adminbuttons = card.appendChild(document.createElement("div"));
      adminbuttons.classList.add("extra", "content", "transition", "hidden");

        var abutton1 = adminbuttons.appendChild(document.createElement("button"));
        abutton1.classList.add("circular", "ui", "icon", "button", "right", "floated", "transition", "hidden", "buttontrash");

          var aicon1 = abutton1.appendChild(document.createElement("i"));
              aicon1.classList.add("trash", "icon");
        
        var abutton2 = adminbuttons.appendChild(document.createElement("button"));
        abutton2.classList.add("circular", "ui", "icon", "button", "right", "floated", "transition", "hidden", "buttonsettings");

          var aicon2 = abutton2.appendChild(document.createElement("i"));
              aicon2.classList.add("edit", "icon");
      }
      if(accesslevel >= 1) {
      var twobuttons = card.appendChild(document.createElement("div"));
      twobuttons.classList.add("ui", "two", "bottom", "attached", "buttons", "cancel", "confirm", "transition", "hidden", "hd");

        var cbutton1 = twobuttons.appendChild(document.createElement("div"));
        cbutton1.classList.add("negative", "ui", "button");
        cbutton1.textContent = "Cancel";

        var cbutton2 = twobuttons.appendChild(document.createElement("div"));
        cbutton2.classList.add("positive", "ui", "button");
        cbutton2.textContent = "Confirm";
      
      var warning = card.appendChild(document.createElement("div"));
      warning.classList.add("ui", "bottom", "attached", "hidden", "error", "message");
      
        var wicon = warning.appendChild(document.createElement("i"));
        wicon.classList.add("icon", "warning");

        var text = warning.appendChild(document.createTextNode("Enter a number!"));
      }
    }
    amount -= 3;
  }
}

function isAdmin()
{
  var rot = document.getElementById("rot")
  console.log(rot.children)
  for (var i = 0; i < rot.children.length; i++) {
    for (var j = 0; j < rot.children[i].children.length; j++) {
      var card = rot.children[i].children[j]
      var main = card.children[2]
      var button1 = main.children[0]
      var button2 = main.children[1]
      $(main).transition('slide down');
      $(button1).transition('slide down');
      $(button2).transition('slide down');
    }
  }
}

function currentObjectAmount(addSub, card) {
  var content = card.parentElement.parentElement.parentElement;
  var itemAmount = content.children[1].textContent
  console.log(content.children[2].children[0].value)
  console.log((parseInt(itemAmount) + (parseInt(content.children[2].children[0].value) * addSub)))
  content.children[1].innerHTML = (parseInt(itemAmount) + (parseInt(content.children[2].children[0].value) * addSub))
}