console.log("background running");

var TabInfo={}; //

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        var msg;
        switch(message.type) {
            case "ConToBack_SaveTabComicInfo":
                console.log("ContoBack_SaveTabComicInfo");
                console.log(message);
                TabInfo[message.id]=message;
                console.log("titleImgSrc");
                console.log(TabInfo);
                break;
            case "PopToBack_GetComicInfo":
                console.log(message.id+"info :"+TabInfo[message.id]);
                sendResponse(TabInfo[message.id]);
                break;
            case "PopToBack_ComicDown":
                console.log(message);
                msg={
                    type:"BackToCon_GetComicList",
                    tabId:message.tabId
                };
                chrome.tabs.sendMessage(message.tabId,msg);
                break;
            case "ConToBack_ReturnImageList":
                let ImageList = message.imageList;
                let episodeName = TabInfo[message.tabId].episodeName;
                var count=0;
                for(Imageurl of ImageList){
                    count++;
                    chrome.downloads.download({
                        url:Imageurl,
                        filename:episodeName+"-"+FormatNumberLength(count,3)+".jpg"
                    })
                    //$.ajax({ url:Imageurl, success: function(data) { console.log(data); } });
                }
                break;
        }
    }
);

chrome.tabs.onHighlighted.addListener(function(highlightInfo) {
    console.log("highlightInfo!",highlightInfo.tabIds[0]);
    chrome.tabs.getSelected(null,function (tab) {
        var msg=MakeMessage(tab);
        if(msg.type=="BackToCon_NaverComicInfo"){
            console.log(msg);
            chrome.browserAction.setIcon({
                path:"icon_able.png",
                tabId: tab.id
            });
            chrome.browserAction.setPopup({
                popup:"sketch/Popup.html",
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
    if(msg.type=="BackToCon_NaverComicInfo"){
        console.log(msg);
        chrome.browserAction.setIcon({
            path:"icon_able.png",
            tabId: tab.id
        });
        chrome.browserAction.setPopup({
            popup:"sketch/Popup.html",
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

function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

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
    var episode=null;
    var qs = getUrlParams(tabUrl);
    console.log(tab.id,tabUrl,qs);
    if( tabUrl.search("comic.naver.com")>0 && tabUrl.search("titleId")>0 && tabUrl.search("no")>0)
    {
        type="BackToCon_NaverComicInfo";
        titleId=qs.titleId;
        episode=qs.no;
    }
    let msg={
        tabUrl:tabUrl,
        tabId:tabId,
        type:type,
        comicId:titleId,
        episode:episode,
        company:"Naver"
    };
    return msg;

}

function getUrlParams(tabUrl) {
    var params = {};
    tabUrl.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
}