console.log("background running");

//chrome.browserAction.setPopup({popup:"sketch/index.html"});

chrome.tabs.onHighlighted.addListener(function(highlightInfo) {
    console.log("highlightInfo!");
    console.log(highlightInfo.tabIds[0]);
    chrome.tabs.getSelected(null,function (tab) {
        let msg=MakeMessage(tab);
        console.log(msg);
        chrome.tabs.sendMessage(tab.id,msg);
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("create!");
    console.log(tab);
    let msg=MakeMessage(tab);
    console.log(msg);
    chrome.tabs.sendMessage(tab.id,msg);
});

function MakeMessage(tab){
    var tabUrl = tab.url;
    var tabId = tab.id;
    var type;
    var titleId;
    var qs = getQueryStringObject();
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

function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}