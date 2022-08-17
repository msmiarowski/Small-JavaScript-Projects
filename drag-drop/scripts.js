/* 
STRETCH GOAL
- MAKE THE BOARD MOBILE/TOUCH FRIENDLY FOR DRAG AND DROP
*/

let dragged;
let span = `<span id="drag-me" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', null)">drag me</span>`;

// events fired on the draggable target
document.addEventListener('drag', event => {}, false);

document.addEventListener('dragstart', event => {
  // reference to draggable item
  dragged = event.target;
  event.target.parentNode.classList.remove('selected');
}, false);

document.addEventListener('dragend', event => {}, false);

// events fired on the drop targets
document.addEventListener('dragover', event => {
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
    event.target.classList.add('selected');
    event.target.style.backgroundColor = '';
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
    
    updateBoard();
  }
}, false);

function updateBoard() {
  const board = Array.from(document.querySelectorAll('.grid-item'));
  board.forEach((el, i) => {
    let elClassArr = Array.from(el.classList);
    console.log(elClassArr, i);
    if(elClassArr.includes('selected')) {
      localStorage.setItem('position', i.toString());
    }
  });
  console.log(localStorage);
}


window.addEventListener('load', () => {
  const board = Array.from(document.querySelectorAll('.grid-item'));
  let position = localStorage.getItem('position');
  position = parseInt(position);
  
  // move piece to last location
  if(position) {

  } else {
    board[4].classList.add('selected');
  }
});