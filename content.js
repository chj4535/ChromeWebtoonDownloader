console.log("heelo?");



chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message,sender,sendResponse) {
    console.log(message,"message receive");
    if(message.type=="naver"){
        var result = document.evaluate("//body//div[@class = 'thumb']//a//img",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
        console.log(result);
        console.log(result["src"]);
        chrome.runtime.sendMessage({
            type: 'content',
            id:message.tabId,
            src:result["src"]
        });
    }
}
