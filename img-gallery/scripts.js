const activeImg = document.querySelector('#active-gallery-image');
const galleryNav = document.querySelectorAll('.gallery-img');

galleryNav.forEach((img, i) => {
  img.addEventListener('click', e => {
    let clickedImgSrc = e.target.src;
    let tempId = parseInt(activeImg.dataset.activeId);
    
    if(clickedImgSrc && activeImg.src !== clickedImgSrc) {
      galleryNav[tempId].classList.remove('active');
      e.target.parentNode.classList.add('active');
      activeImg.dataset.activeId = i;
      activeImg.src = clickedImgSrc;
    }
  });
});