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
const fixedTime = 3000;

async function sendRequests(message) {
  let { peoples } = message;
  let totalInviteSent = 0;
  console.log('sendRequest3');
  await timer(fixedTime);

  for (totalInviteSent; totalInviteSent < peoples; ) {
    await timer(fixedTime);
    let allButtons = document.getElementsByClassName(
      'css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-15ysp7h r-4wgw6l r-ymttw5 r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l'
    );
    console.log('from', allButtons);

    for (let i = 0; i < allButtons.length; i++) {
      console.log('index', allButtons[i], allButtons[i].ariaLabel);
      if (
        allButtons &&
        allButtons[i].ariaLabel &&
        allButtons[i].ariaLabel.includes('Follow ')
      ) {
        allButtons[i].click();
        totalInviteSent++;
        console.log(
          'totalInviteSent',
          totalInviteSent,
          allButtons[i].ariaLabel.includes('Follow ')
        );
        if (totalInviteSent == peoples) break;

        await timer(fixedTime);
      }
    }
    window.scrollBy({
      top: 3000,
      left: 100,
      behavior: 'smooth'
    });
  }
}
