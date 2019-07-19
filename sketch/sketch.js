// let date = new Date().toLocaleString();
// console.log(date);

var Inputstartvalue;
var Inputendvalue;
var NumbrInputStart;
var NumbrInputEnd;
var DownButton;
var maxEpisode;
var titleId;
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currTab = tabs[0];
    console.log(currTab);
    if (currTab) { // Sanity check
        
        // chrome.runtime.sendMessage({type: "getSrc",id:currTab.id}, function(info) {
        //     console.log(info)
        //     NumbrInputStart = document.getElementById("NumbrInputStart");
        //     NumbrInputEnd = document.getElementById("NumbrInputEnd");
        //     DownButton = document.getElementById("DownButton");
        //     document.getElementById("WebtoonTitleImg").src = info.src;
        //     document.getElementById("WebtoonTitle").innerText = info.title;
        //     document.getElementById("WebtoonTitleAutohr").innerText = info.author;
        //     NumbrInputStart.value = "1";
        //     NumbrInputStart.min = "1";
        //     Inputstartvalue="1";
        //     NumbrInputEnd.value = info.lastEpsode;
        //     NumbrInputEnd.max=info.lastEpsode;
        //     Inputendvalue=info.lastEpsode;
        //     maxEpisode=info.lastEpsode;
        //     titleId=info.comicId;
        //     NumbrInputStart.addEventListener("input",ChangeInputStart);
        //     NumbrInputEnd.addEventListener("input",ChangeInputEnd);
        //     DownButton.addEventListener("click",ComicDownEvent);
        // });
    }
});

function ChangeInputStart() {
    Inputstartvalue=NumbrInputStart.value;
    console.log("ChangeInputStart",Inputstartvalue);
    if(Number(Inputstartvalue)<1) {
        Inputstartvalue="1";
        NumbrInputStart.value=Inputstartvalue;
    }
    if(Number(Inputstartvalue)>Number(Inputendvalue)){
        Inputstartvalue=Inputendvalue;
        NumbrInputStart.value=Inputstartvalue;
    }
    console.log("ChangeInputStart",Inputstartvalue);
}

function ChangeInputEnd() {
    Inputendvalue=NumbrInputEnd.value;
    console.log("ChangeInputEnd",Inputendvalue);
    if(Number(Inputendvalue)>Number(maxEpisode)) {
        Inputendvalue=maxEpisode;
        NumbrInputEnd.value=maxEpisode;
    }
    if(Number(Inputendvalue)<Number(Inputstartvalue)){
        Inputendvalue=Inputstartvalue;
        NumbrInputEnd.value=Inputendvalue;
    }
    console.log("ChangeInputEnd",Inputendvalue);
}

function ComicDownEvent() {
    let msg={
        type:"comicDown",
        titleId:titleId,
        startEpisode:Inputstartvalue,
        endEpisode:Inputendvalue
    };
    console.log(msg);
    chrome.runtime.sendMessage(msg)
    //window.close();
}
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var currTab = tabs[0];
//     if (currTab) { // Sanity check
//         /* do stuff */
//         let titleImg = select('#WebtoonTitleImg');
//         let button = select('#down');
//         console.log(titleImg);
//         let value =currTab.id+"src";
//         button.button.(function () {
//             chrome.storage.local.get(value,function (obj) {
//                 console.log('Value is ' + obj.value);
//             });
//         });
//     }
// });
// }
