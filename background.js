console.log("background running");

//chrome.browserAction.setPopup({popup:"sketch/index.html"});
var titleImgSrc={};

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "content":
                titleImgSrc[message.id]=message.src;
                console.log(titleImgSrc);
                break;
            case "getSrc":
                console.log(message.id+"scr :"+titleImgSrc[message.id]);
                sendResponse(titleImgSrc[message.id]);
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);

chrome.tabs.onHighlighted.addListener(function(highlightInfo) {
    console.log("highlightInfo!",highlightInfo.tabIds[0]);
    chrome.tabs.getSelected(null,function (tab) {
        var msg=MakeMessage(tab);
        if(msg.type=="naver"){
            console.log(msg);
            chrome.browserAction.setIcon({
                path:"icon_able.png",
                tabId: tab.id
            });
            chrome.browserAction.setPopup({
                popup:"sketch/index.html",
                tabId: tab.id
            });
            chrome.tabs.sendMessage(tab.id,msg);
        }else{
            chrome.browserAction.setIcon({
                path:"icon_disable.png",
                tabId: tab.id
            });
            chrome.browserAction.setPopup({
                popup:"",
                tabId: tab.id
            });
        }
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("create!",tabId);
    var msg=MakeMessage(tab);
    if(msg.type=="naver"){
        console.log(msg);
        chrome.browserAction.setIcon({
            path:"icon_able.png",
            tabId: tab.id
        });
        chrome.browserAction.setPopup({
            popup:"sketch/index.html",
            tabId: tab.id
        });
        chrome.tabs.sendMessage(tab.id,msg);
    }else{
        chrome.browserAction.setIcon({
            path:"icon_disable.png",
            tabId: tab.id
        });
        chrome.browserAction.setPopup({
            popup:"",
            tabId: tab.id
        });
    }
});

function MakeMessage(tab){
    var tabUrl = tab.url;
    var tabId = tab.id;
    var type;
    var titleId=null;
    var qs = getUrlParams(tabUrl);
    console.log(tab.id,tabUrl,qs);
    if( tabUrl.search("comic.naver.com")>0 && tabUrl.search("titleId")>0)
    {
        type="naver";
        titleId=qs.titleId;
    }
    let msg={
        tabUrl:tabUrl,
        tabId:tabId,
        type:type,
        comicId:titleId
    };
    return msg;

}

function getUrlParams(tabUrl) {
    var params = {};
    tabUrl.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
}