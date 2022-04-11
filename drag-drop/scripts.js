/* 
STRETCH GOAL
- MAKE THE BOARD MOBILE/TOUCH FRIENDLY FOR DRAG AND DROP
*/

let dragged;

// events fired on the draggable target
document.addEventListener("drag", event => {}, false);

document.addEventListener('dragstart', event => {
  // reference to draggable item
  dragged = event.target;
}, false);

document.addEventListener("dragend", event => { }, false);

// events fired on the drop targets
document.addEventListener("dragover", event => {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener('dragenter', event => {
  // color change to indicate which square you're over
  if(event.target.className == 'grid-item') {
    event.target.style.backgroundColor = 'rgba(41, 128, 185, .2)';
  }
}, false);

document.addEventListener('dragleave', event => {
  // reset squares BG color when you exit the square
  if(event.target.className == 'grid-item') {
    event.target.style.backgroundColor = '';
  }
}, false);

document.addEventListener('drop', event => {
  event.preventDefault();
  // move the draggable item to your chosen location
  if(event.target.className == 'grid-item') {
    event.target.style.backgroundColor = '';
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
}, false);