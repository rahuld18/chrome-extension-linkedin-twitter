console.log('This is a popup!');

let button = document.getElementById('send-request-button');
let people = document.getElementById('peoples');
let msgInp = document.getElementById('msg');

button.disabled = true;
people.addEventListener('change', function (event) {
  button.disabled = event.target.value && msgInp.value ? false : true;
});

msgInp.addEventListener('change', function (event) {
  button.disabled = event.target.value && people.value ? false : true;
});

button.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'sendRequest',
      peoples: people.value,
      msg: msgInp.value
    });
  });
});
