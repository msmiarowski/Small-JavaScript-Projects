// document.addEventListener('mousemove', e => {
//   let body = document.querySelector('body');
//   let icon = document.querySelector('#circle');
//   // console.log(e.clientX, e.clientY);
//   // let left = e.pageX;
//   // let top = e.pageY;
//   // icon.style.left = `${left}px`;
//   // icon.style.top = `${top}px`;
//   icon.style.setProperty('--xPos', e.clientX+'px');
//   icon.style.setProperty('--yPos', e.clientY+'px');
//   icon.style.opacity = 1;
// });

let icon =  document.querySelector('#icon');
let embedContainer = document.querySelector('.embed-container');
let isFiring = false;
let mouseX = 0;
let mouseY = 0;

let dX = 0;
let dY = 0;

let xPos = 0;
let yPos = 0;

let timeElapsed = 0;
let visibility = true;
    

// let ghost = document.querySelector("#ghost");
	  
let headerFloatie = document.querySelector(".floatie");
// let headerFloatieSVG = document.querySelector(".floatie svg");
let permanentlyHideFloatie = false;

// let isFiring = false;

// let mouseX = 0;
// let mouseY = 0;

// let dX = 0;
// let dY = 0;

// let xPos = 0;
// let yPos = 0;
  
// let ghostTimeElapsed = 0;
// let ghostVisibility = true;


function throttleEvent(event) {
  if (isFiring === false) {
    requestAnimationFrame(() => {
      setIconPosition(event);
      isFiring = false;
    });
  }
  isFiring = true;
}

function setInitialIconPosition() {
  if (permanentlyHideFloatie == true) {
    console.log("Ghost shouldn't be shown at all!");
    icon.style.opacity = 0;
    return;
  }
  let initialXPos = localStorage.getItem("initialX");
  let initialYPos = localStorage.getItem("initialY");
  
  if (initialXPos) {
    icon.style.setProperty("--xPos", initialXPos + "px");
    xPos = Number(initialXPos);
    mouseX = Number(localStorage.getItem("mouseX"));
  }
  
  if (initialYPos) {
    icon.style.setProperty("--yPos", initialYPos + "px");
    yPos = Number(initialYPos);
    mouseY = Number(localStorage.getItem("mouseY"));
  }
  
  console.log(mouseX + " " + initialXPos + ", " + mouseY + " " + initialYPos);
}

setInitialIconPosition();

  function setIconPosition(event) {
  if (permanentlyHideFloatie == false) {
    timeElapsed = 0;
    visibility = true;
    showFloatie();
  } else {
    hideFloatie();
  }
  
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

function moveIcon() {
  if (permanentlyHideFloatie == false) {
    dX = mouseX - xPos;
    dY = mouseY - yPos;

    xPos += (dX / 100);
    yPos += (dY / 100);

    icon.style.setProperty("--xPos", xPos + "px");
    icon.style.setProperty("--yPos", yPos + "px");

    localStorage.setItem("initialX", xPos);
    localStorage.setItem("initialY", yPos);

    localStorage.setItem("mouseX", xPos);
    localStorage.setItem("mouseY", yPos);

    timeElapsed++;


    if ((timeElapsed > 300) && (visibility == true)) {
      hideFloatie();
      visibility = false;
    }
  }

  requestAnimationFrame(moveIcon);
}
moveIcon();
  
function showFloatie() {
  icon.style.opacity = 1;
}

function hideFloatie() {
  icon.style.opacity = 0;
}

headerFloatie.addEventListener("click", toggleFloatieVisibility, false);
  
function getFloatieVisbility() {
  let floatieStatus = localStorage.getItem("floatieVisbility");
  
  if (floatieStatus == "show") {
    permanentlyHideFloatie = false;
    headerFloatieSVG.classList.add("enabled");
  } else if (floatieStatus == "hide") {
    permanentlyHideFloatie = true;
    headerFloatieSVG.classList.remove("enabled");
  } else {
    permanentlyHideFloatie = false;
    headerFloatieSVG.classList.remove("enabled");
  }
}
// getFloatieVisbility();
  
function kickOffFloatie() {
  if (permanentlyHideFloatie == true) {
    hideFloatie();
    embedContainer.classList.add('active');
  } else {
    document.body.addEventListener("mousemove", throttleEvent, false);
    // headerFloatieSVG.classList.add("enabled");
    embedContainer.classList.remove('active');
    showFloatie();
  }
}
kickOffFloatie();
  
function toggleFloatieVisibility(event) {
  let floatieStatus = localStorage.getItem("floatieVisbility");
  
  if (floatieStatus == undefined) {
    console.log("No stored value!");
    localStorage.setItem("floatieVisbility", "hide");
    permanentlyHideFloatie = true;
    
    // headerFloatieSVG.classList.remove("enabled");
  }
  
  if (floatieStatus == "show") {
    localStorage.setItem("floatieVisbility", "hide");
    permanentlyHideFloatie = true;
    
    // headerFloatieSVG.classList.remove("enabled");
  }
  
  if (floatieStatus == "hide") {
    localStorage.setItem("floatieVisbility", "show");
    permanentlyHideFloatie = false;
    
    // headerFloatieSVG.classList.add("enabled");
  }
  kickOffFloatie();
  console.log(permanentlyHideFloatie);
}

