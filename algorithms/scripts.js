// DIFF 2 ARRAYS
const diffBtn = document.querySelector('#diffBtn');
const diff = document.querySelector('.diff');
let arr1 = document.querySelector('.arr1');
let arr2 = document.querySelector('.arr2');

arr1 = arr1.innerText.split(', ');
arr2 = arr2.innerText.split(', ');

diffBtn.addEventListener('click', () => {
  let result = arr1.concat(arr2).filter(item => !arr1.includes(item) || !arr2.includes(item));
  diff.innerText = result.join(', ');
});

