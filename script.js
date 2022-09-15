// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
var sidebarLstatus = false;
var sidebarRstatus = false;
var check = 0;
var gameNo = 0;
if(screen.width > 580) { 
  window.onscroll = function() {scrollFunction()};
} 
else{
  document.getElementById("navbar").style.padding = "10px 10px 10px 10px";
  document.getElementById("logo").style.fontSize = "25px";
  document.getElementsByClassName("fa-gamepad")[0].style.fontSize = "25px";
  document.getElementsByClassName("title")[0].style.display = "none";
}

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "10px 10px 10px 10px";
    document.getElementById("logo").style.fontSize = "25px";
    document.getElementsByClassName("fa-gamepad")[0].style.fontSize = "25px";
    document.getElementsByClassName("title")[0].style.display = "none";
    // document.getElementById("navbar-left").style.top = "8px";
  } else {
    document.getElementById("navbar").style.padding = "80px 10px 25px 10px";
    document.getElementById("logo").style.fontSize = "35px";
    document.getElementsByClassName("fa-gamepad")[0].style.fontSize = "35px";
    document.getElementsByClassName("title")[0].style.display = "inline";
    // document.getElementById("navbar-left").style.top = "30px";
  }
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNavL() {
  if(!sidebarLstatus){
    document.getElementById("mySidenavL").style.width = "250px";
    document.getElementById("all").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    sidebarLstatus = true;
  }
  else{
    closeNavL();
  }
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNavL() {
  document.getElementById("mySidenavL").style.width = "0";
  document.getElementById("all").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
  sidebarLstatus = false;
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNavR() {
  if(!sidebarRstatus){
    document.getElementById("mySidenavR").style.width = "250px";
    document.getElementById("all").style.marginRight = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    sidebarRstatus = true;
  }
  else{
    closeNavR();
  }
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNavR() {
  document.getElementById("mySidenavR").style.width = "0";
  document.getElementById("all").style.marginRight = "0";
  document.body.style.backgroundColor = "white";
  sidebarRstatus = false;
}



















































// const options = {
//       method: 'GET',
//       headers: {
//       Accept: 'application/json'
//     }
//   };
  
//   fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

getdealsSTeam();


var res;
function getdealsSTeam(){
  // Initalize AJAX Request
  var xhttp2 = new XMLHttpRequest();

  // Response handler
  xhttp2.onreadystatechange = function() {

      // Wait for readyState = 4 & 200 response
      if (this.readyState == 4 && this.status == 200) {

          // parse JSON response
          res = JSON.parse(this.responseText);
          createCard(res);
          console.log(res);

      } else if (this.readyState == 4) {

          // this.status !== 200, error from server
          console.log(this.responseText);

      }
  };

  xhttp2.open("GET", "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15", true);

  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.send();
}



br = document.createElement("span");
br.innerHTML = "<br/>";
function createCard(res){
  var cardimg = document.getElementsByClassName("card-img-top");
  var cardtitle = document.getElementsByClassName("card-title");
  var cardtext = document.getElementsByClassName("card-text");
  var cardbody = document.getElementsByClassName("card-body");
  var card = document.getElementsByClassName("card");
  for(var i=0; i < 18;i++){
    cardimg[i].src = res[i].thumb;
    cardtitle[i].innerHTML = res[i].title;
    var br = document.createElement("br");
    cardtext[i].innerHTML = "Deal Rating: " + res[i].dealRating;
    card[i].style.height = "21rem";

    cardbody[i].appendChild(document.createTextNode("Normal Price: $" + res[i].normalPrice));
    cardbody[i].appendChild(br);

    var sale = document.createElement("p");
    sale.innerHTML = "Sale Price: $" + res[i].salePrice;
    sale.style.color = "#a70000";
    cardbody[i].appendChild(sale);
    cardbody[i].appendChild(document.createTextNode("Saving: " + parseInt(res[i].savings,10) + "%"));


    cardbody[i].appendChild(br);

    var buttongroup = document.createElement("div");
    buttongroup.className +="btn-group";
    buttongroup.role ="group";
    buttongroup.style.position = "absolute";
    buttongroup.style.bottom = "10px";
    

    cardbody[i].appendChild(buttongroup);
  }
  for(var i=0; i < 18;i++){
    document.getElementsByClassName("btn-group")[i].appendChild(createbutton1(res[i]));
    document.getElementsByClassName("btn-group")[i].appendChild(createbutton2(res[i]),i);
  }

}

function createbutton1(res){
  var navbutton = document.createElement("button");
  navbutton.type = "button";
  navbutton.className +="btn btn-dark";
  // navbutton.href = "https://store.steampowered.com/app/" + 
  navbutton.innerHTML = "Details";
  navbutton.onclick = function(){
    var url = "https://store.steampowered.com/app/";
    window.open(url+res.steamAppID);
  }
  return navbutton;
}



function createbutton2(res,i){
  var navbutton = document.createElement("button");
  navbutton.type = "button";
  navbutton.className +="btn btn-secondary";
  navbutton.innerHTML = "Add cart";
  navbutton.onclick = function(){
    openNavR();
    sidebarRstatus = false;
    var selcard = document.createElement("div");
    selcard.className +="card m-4";
    var selcardimg = document.createElement("img");
    selcardimg.src = res.thumb;
    var selcardbody = document.createElement("card-body");
    selcardbody.appendChild(document.createTextNode("Price: " + res.salePrice));
    selcard.appendChild(selcardimg);
    selcard.appendChild(selcardbody);
    document.getElementById("mySidenavR").appendChild(selcard);
    addP(res.salePrice);
  }
  return navbutton;
}
function addP(p){
  check += parseFloat(p,10);
  check = parseFloat(check.toFixed(2));
  document.getElementById("totalprice").innerHTML= "Total: $" + check;
  gameNo ++;
}
function clearcart(){
  var clear = document.getElementsByClassName("card m-4");
  var i = clear.length;
  while(i>0){
    document.getElementById("mySidenavR").removeChild(clear[i-1]);
    i--;
  }
  check = 0.00;
  document.getElementById("totalprice").innerHTML= "Total: $" + check.toString();
}

function openxbox(){
  window.open("https://www.xbox.com/");
}

function openps5(){
  window.open("https://www.playstation.com/en-us/ps5/");
}

function openns(){
  window.open("https://www.nintendo.com/switch/");
}

function openFC(){
  window.open("https://www.ubisoft.com/en-gb/game/far-cry/far-cry-6");
}
function openMF(){
  window.open("https://www.ea.com/games/madden-nfl/madden-nfl-22");
}
function openB4B(){
  window.open("https://back4blood.com/en-gb");
}
function openMD(){
  window.open("https://www.nintendo.com/games/detail/metroid-dread-switch/");
}