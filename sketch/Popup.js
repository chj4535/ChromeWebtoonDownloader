// let date = new Date().toLocaleString();
// console.log(date);


var DownButton;
var titleId;
var currentTab;
var currentInfo;
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    currentTab = tabs[0];
    console.log(currentTab);
    if (currentTab) { // Sanity check
        chrome.runtime.sendMessage({type: "PopToBack_GetComicInfo",id:currentTab.id}, function(info) {
            console.log(info);
            currentInfo=info;
            DownButton = document.getElementById("DownButton");
            document.getElementById("WebtoonTitleImg").src = info.src;
            document.getElementById("WebtoonTitle").innerText = info.title;
            document.getElementById("WebtoonTitleAutohr").innerText = info.author;
            document.getElementById("WebtoonCompany").innerText=info.company;
            document.getElementById("WebtoonEpisodeName").innerText=info.episodeName;
            titleId=info.comicId;
            DownButton.addEventListener("click",ComicDownEvent);
        });
    }
});

function ComicDownEvent() {
    let msg={
        type:"PopToBack_ComicDown",
        tabId:currentTab.id,
    };
    console.log(msg);
    chrome.runtime.sendMessage(msg)
}
