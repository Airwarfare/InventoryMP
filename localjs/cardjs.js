function InputUIHandle(input) {
  var parent = input.parentElement;
  var elements = parent.children;
  var contents = parent.parentElement;
  var card = contents.parentElement;
  if(isNaN(input.value)) {
    parent.classList.add("error");
    card.children[4].classList.remove("hidden");
  }
  else {
    if(parent.classList.contains("error")) {
      parent.classList.remove("error");
      card.children[4].classList.add("hidden");
    }
  }

  if(elements[2].children[0].classList.contains("hidden") && input.value != "") {
    $(elements[2].children[0]).transition('slide down');
    $(elements[2].children[1]).transition('slide down');
    return;
  }

  if(!elements[2].children[0].classList.contains("hidden") && input.value == "") {
    $(elements[2].children[0]).transition('slide down');
    $(elements[2].children[1]).transition('slide down');
    return;
  }
}

function CreateCard() {
  var root = document.body.children[3];
  var amount = 10;
  while(!(amount <= 0)) {
    var a = 3;
    if(amount <= 2) {
      a = amount;
    }
    var current = root.appendChild(document.createElement("div"));
    current.classList.add("ui", "three", "cards");
    for (var i = 0; i < a; i++) {
      //Card
      var card = current.appendChild(document.createElement("div"));
      card.classList.add("ui", "card");
      //Image
      var image = card.appendChild(document.createElement("div"));
      image.classList.add("image");

        var img = image.appendChild(document.createElement("img"));
        img.src = "logo.png";
      //Content
      var content =  card.appendChild(document.createElement("div"));
      content.classList.add("content");

        var header = content.appendChild(document.createElement("header"));
        header.classList.add("header");
        header.textContent = "Item Name";

        var meta = content.appendChild(document.createElement("meta"));
        meta.classList.add("meta");
        meta.textContent = "Item Amount";

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
            
              var icon1 = button1.appendChild(document.createElement("i"));
              icon1.classList.add("minus", "icon");

            var button2 = buttongroup.appendChild(document.createElement("button"));
            button2.classList.add("ui", "green", "basic", "button", "icon", "transition", "hidden");

              var icon2 = button2.appendChild(document.createElement("i"));
              icon2.classList.add("plus", "icon");
        
      var adminbuttons = card.appendChild(document.createElement("div"));
      adminbuttons.classList.add("extra", "content", "transition", "hidden");

        var abutton1 = adminbuttons.appendChild(document.createElement("button"));
        abutton1.classList.add("circular", "ui", "icon", "button", "right", "floated", "transition", "hidden", "buttontrash");
        
        var abutton2 = adminbuttons.appendChild(document.createElement("button"));
        abutton1.classList.add("circular", "ui", "icon", "button", "right", "floated", "transition", "hidden", "buttonsettings");
      
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
    amount -= 3;
  }
}