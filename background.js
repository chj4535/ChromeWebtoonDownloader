console.log("background running");

//chrome.browserAction.setPopup({popup:"sketch/index.html"});
var titleImgSrc={};

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "content":
                console.log("content");
                console.log(message);
                titleImgSrc[message.id]=message;
                console.log("titleImgSrc");
                console.log(titleImgSrc);
                break;
            case "getSrc":
                console.log(message.id+"info :"+titleImgSrc[message.id]);
                sendResponse(titleImgSrc[message.id]);
                break;
            case "comicDown":
                console.log(message);
                DownNaverComics(message);
                // var imgurl = "https://image-comic.pstatic.net/webtoon/131385/410/20190717224009_fa6ca476c9f607a91ee8a46ac1c24f64_IMAG01_1.jpg";
                // chrome.downloads.download({url:imgurl},function(){
                //     console.log("download begin, the downId is:");
                // });
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

function DownNaverComics(comicinfo){
    console.log(comicinfo);
    for(let i=Number(comicinfo.startEpisode); i<=Number(comicinfo.endEpisode);i++){
        DownNaverComic(comicinfo.titleId,i);
    }
    //https://comic.naver.com/webtoon/detail.nhn?titleId=131385&no=410&weekday=thu
}

function DownNaverComic(titleId,no){
    $.ajax({ url: 'https://comic.naver.com/webtoon/detail.nhn?titleId=131385&no=410&weekday=thu', success: function(data) { console.log(data); } });
    var data = httpGet("https://comic.naver.com/webtoon/detail.nhn?titleId=131385&no=410&weekday=thu");
    console.log(data);
    console.log(data.match(/.*<div>(.*)<\/div>.*/));
    function httpGet(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
}



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