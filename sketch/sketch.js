let date = new Date().toLocaleString();
console.log(date);

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currTab = tabs[0];
    console.log(currTab);
    if (currTab) { // Sanity check
        chrome.runtime.sendMessage({type: "getSrc",id:currTab.id}, function(src) {
            console.log(src)
            document.getElementById("WebtoonTitleImg").src = src;
        });
    }
});


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
