console.log('from content');
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('sendRequest1');
  if (message.action === 'sendRequest') {
    console.log('sendRequest2', message);
    // Find and click the connection button (replace with correct selector for your LinkedIn version)
    sendRequests(message);
  }
});

const timer = (ms) => new Promise((res) => setTimeout(res, ms));
const fixedTime = 5000;

async function sendRequests(message) {
  let { peoples, msg } = message;
  let totalInviteSent = 0;
  console.log('sendRequest3');
  await timer(fixedTime);

  let allButtons = document.getElementsByClassName(
    'artdeco-button artdeco-button--2 artdeco-button--secondary ember-view'
  );
  console.log('from', allButtons);

  for (let i = 2; i < allButtons.length; i++) {
    console.log(
      'index',
      allButtons[i],
      allButtons[i].ariaLabel,
      allButtons[i].ariaLabel.includes('Invite')
    );
    if (allButtons && allButtons[i].ariaLabel.includes('Invite')) {
      allButtons[i].click();
      let modal = document.getElementsByClassName(
        'artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view mr1'
      );
      console.log('modal', modal, modal[0]);
      await timer(fixedTime);

      if (modal && modal[0].ariaLabel.includes('Add a note')) {
        modal[0].click();
        await timer(fixedTime);

        let msgBox = document.getElementById('custom-message');
        console.log('modal msgBox', msgBox);
        msgBox.value = msg;
        msgBox.click();
        await timer(fixedTime);

        let send = document.getElementsByClassName(
          'artdeco-button artdeco-button--2 artdeco-button--primary artdeco-button--disabled ember-view ml1'
        );
        console.log('send', send, send[0]);
        send[0].disabled = false;
        send[0].click();
        totalInviteSent++;
        if (totalInviteSent == peoples) break;
      }
    }
  }
}
