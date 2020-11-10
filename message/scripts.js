const { hash } = window.location; // get url hash
const messageForm = document.querySelector('#message-form');

const message = atob(hash.replace('#', '')); // remove the # and decode the Base64 encoded message

// if there is a # show it and hide the other HTML elemts on the page
if(message) {
  messageForm.classList.add('hide');
  document.querySelector('#message-show').classList.remove('hide');
  document.querySelector('#create-you-own').innerHTML = message;

  console.log('message', message);
}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault(); // stop form from reloading page

  messageForm.classList.add('hide'); // hide form to take a message
  // show converted message
  document.querySelector('#link-form').classList.remove('hide');

  const input = document.querySelector('#message-input');
  const encrypted = btoa(input.value); // encrypt the input field in Base64

  console.log('encrypted', encrypted);

  const linkInput = document.querySelector('#link-input');
  linkInput.value = `${window.location}#${encrypted}`;
  linkInput.select();
}); 