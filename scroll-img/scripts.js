document.querySelectorAll('.gallery-wrapper').forEach(gallery => {
  const slides = gallery.querySelectorAll('.gallery-img');
  const totalSlides = slides.length;
  
  if(slides.length > 0) slides[0].classList.add('is-visible');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const windowHeight = window.innerHeight;
    let activeIndex = Math.floor(scrollPos / windowHeight);

    if(activeIndex < 0) activeIndex = 0;
    if(activeIndex >= totalSlides) activeIndex = totalSlides - 1;

    slides.forEach((slide, i) => {
      if(i === activeIndex) {
        slide.classList.add('is-visible');
      } else {
        slide.classList.remove('is-visible');
      }
    });
  });

  // slides.forEach(slide => {
  //   // console.log(slide.clientHeight);
  //   // slide.parentNode.style.height = `${slide.clientHeight}px`;
    
  //   const observer = new IntersectionObserver(entries => {
  //     entries.forEach(entry => {
  //       console.log(entry.isIntersecting);
  //       console.log(entry.target);
  //       if(entry.isIntersecting) {
  //         // fade out others if needed, or fade current img in
  //         slides.forEach(slide => slide.classList.remove('is-visible'));
  //         entry.target.classList.add('is-visible');
  //       }
  //     });
  //   }, {threshold: 0.5}); 
  //   observer.observe(slide);
  // });
});