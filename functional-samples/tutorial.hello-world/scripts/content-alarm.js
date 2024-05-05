console.log("from content");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("sendRequest1");
  if (message.action === "sendRequest") {
    console.log("sendRequest2");
    chrome.alarms.create("sendRequestAlarm", { periodInMinutes: 0 }); // Create the alarm
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "sendRequestAlarm") {
    console.log("sendRequest3");
    myLoop();
  }
});

function myLoop() {
  var i = 3;

  function performActions() {
    let d = document.getElementsByClassName('artdeco-button artdeco-button--2 artdeco-button--secondary ember-view');
    console.log("from", d);
    console.log("index", d[i], d[i].ariaLabel, d[i].ariaLabel.includes("Invite"));

    if (d && d[i].ariaLabel.includes("Invite")) {
      d[i].click();

      function handleModal() {
        let modal = document.getElementsByClassName('artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view mr1');
        console.log("modal", modal, modal[0]);

        if (modal && modal[0].ariaLabel.includes("Add a note")) {
          modal[0].click();

          function handleMessageBox() {
            let msgBox = document.getElementById('custom-message');
            console.log("modal msgBox", msgBox);
            msgBox.value = "hi, We have a same interest";
            msgBox.click();

            function handleSendButton() {
              let send = document.getElementsByClassName('artdeco-button artdeco-button--2 artdeco-button--primary artdeco-button--disabled ember-view ml1');
              console.log("send", send, send[0]);
              send[0].disabled = false;
              send[0].click();
            }

            chrome.alarms.create("handleSendButtonAlarm", { when: Date.now() + 2000 }); // Set alarm for send button
          }

          chrome.alarms.create("handleMessageBoxAlarm", { when: Date.now() + 2000 }); // Set alarm for message box
        }
      }

      chrome.alarms.create("handleModalAlarm", { when: Date.now() + 2000 }); // Set alarm for modal
    }

    i++;
    if (i < 6) {
      chrome.alarms.create("myLoopAlarm", { when: Date.now() + 3000 }); // Set alarm for next loop iteration
    }
  }

  chrome.alarms.create("performActionsAlarm", { when: Date.now() + 3000 }); // Set alarm to start actions
}
