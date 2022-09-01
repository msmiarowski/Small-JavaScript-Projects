let globalCounter = 0;
let globalPosts = [];

function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => {
    let postsArr = sliceIntoChunks(json, 5);
    if(postsArr.length > globalCounter) {
      globalPosts = postsArr;
      postsToDom(globalPosts, globalCounter);
    }
  })
  .catch(err => console.error(err));
}

getPosts();


function postsToDom(posts, counter) {
  for(const post of posts[counter]) {
    const div = document.querySelector('#posts');
    const markup = `
      <div class="post">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      </div>
    `;
    div.insertAdjacentHTML('beforeend', markup);
  }
  globalCounter++;
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
  if(scrollDepth >= 10) {
    document.getElementById('title').classList.add('small');
  }
  else {
    document.getElementById('title').classList.remove('small');
  }
  if(scrollDepth >= 80 && globalPosts.length > globalCounter) {
    postsToDom(globalPosts, globalCounter);
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