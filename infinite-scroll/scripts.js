(function() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      let posts = sliceIntoChunks(json, 5);
      showPosts(posts);
    })
    .catch(err => console.error(err));
    

  function showPosts(arr) {
    console.log(arr);
    // for(const post of posts[0]) {
    //   const div = document.querySelector('#posts');
    //   const markup = `
    //     <div class="post">
    //       <h2>${post.title}</h2>
    //       <p>${post.body}</p>
    //     </div>
    //   `;
    //   div.insertAdjacentHTML('beforeend', markup);
    // }
  }


  function sliceIntoChunks(arr, chunkSize) {
    const result = [];
    for(let i = 0; i < arr.length; i+= chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  }

  window.addEventListener('scroll', event => {
    let scrollDepth = amountScrolled();
    console.log(scrollDepth)
    if(scrollDepth >= 80) {
      // add posts to DOM
    }
  });

  function getDocHeight() {
    let doc = document;
    return Math.max(
        doc.body.scrollHeight, doc.documentElement.scrollHeight,
        doc.body.offsetHeight, doc.documentElement.offsetHeight,
        doc.body.clientHeight, doc.documentElement.clientHeight
    )
  }

  function amountScrolled(){
    let winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
    let docheight = getDocHeight()
    let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    let trackLength = docheight - winheight
    let pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    // console.log(pctScrolled + '% scrolled')
    return pctScrolled;
}
})();