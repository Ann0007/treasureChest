/*
* Function that initiates the whole Game application.
*/
function init(){
  initChests();
  initScoreBoard();
  pickedChest = false;
}

let random;
let score = 0; //count users points
let pointValue = 5; //right guess gives 5 points
let counter = document.createElement('p'); //contains score
let chestElems = []; //chestarray
let treasureElem; //the 3 chests
let pickedChest; //when you picked your chest

/*
 * Function to loop trough 3 chests
 */
function initChests() {
  
  for (var i = 0; i < 3; i++){ //loops throu and get 3 chests
    
    let closedchest = document.createElement('img');
    closedchest.setAttribute('src', 'images/chest-closed.png');
    closedchest.style.padding = '15px';
    closedchest.addEventListener('click', onclick, false);
    document.getElementById("chests").appendChild(closedchest);
    chestElems.push(closedchest);
  }  
  treasureElem = Math.floor(Math.random()*chestElems.length)
}

// Adding the event after DOM is loaded, initiate chests and score
document.addEventListener("DOMContentLoaded", function() {
  let refreshButton = document.getElementById('refresh-button');
  refreshButton.addEventListener('click', refreshChests);
  init();
});

/*
* Function that gets 3 new closed chests and prevent from open more than one chest per game.
*/
function refreshChests(){
  for (var i = 0; i < 3; i++){
    chestElems[i].setAttribute('src', 'images/chest-closed.png')
  }
  treasureElem = Math.floor(Math.random()*chestElems.length)
  pickedChest = false;
}


function onclick(e) { 
  if (pickedChest == true) return //if right picked chest do this
  
  if (chestElems[treasureElem] == e.target) { // gets picture from pexels and initate 5+ score
    getImageFromPexels(e);
    score +=pointValue;
    initScoreBoard();

} else {
  e.target.setAttribute('src', 'images/chest-open.png'); //if not picked rigt chest, show an open empty chest.
  }

pickedChest = true;
};
 

/**
 * Function that keeps the users score
 */
 function initScoreBoard(){ 
  let sectionReference = document.getElementById('game-wrapper')

  counter.textContent='score:'+ score; 
  counter.style.color= 'white';
  counter.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
  counter.style.textAlign='center';
  counter.style.fontSize = "x-large";
  document.body.appendChild(sectionReference);
  sectionReference.appendChild(counter); 
}

/*
 * Function that gets a image from pexels and return a random image.
 */
function getImageFromPexels(e){
  var xhr = new XMLHttpRequest();

  xhr.open ('GET',`https://api.pexels.com/v1/search?query=treasure&per_page=1&page=${Math.floor(Math.random() * 20)}`)
  xhr.setRequestHeader('Authorization', '563492ad6f91700001000001cd2e329e7d2b4af1a90940fe99685ceb');
  xhr.send();

  xhr.addEventListener('load',function () {
    var pexels = JSON.parse(this.response) 
    e.target.src= pexels.photos[0].src.small;
  })
}


