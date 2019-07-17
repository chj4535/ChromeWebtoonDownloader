console.log("heelo?");

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message,sender,sendResponse) {
    console.log("message receive");
    console.log(message);
}