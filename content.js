console.log("heelo?");



chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message,sender,sendResponse) {
    console.log(message,"message receive");
    if(message.type=="naver"){
        let comicinfo = document.querySelector('.comicinfo');
        console.log(comicinfo);
        let detail = comicinfo.querySelector('.detail');
        console.log(detail);
        let thumb = comicinfo.querySelector('.thumb');
        console.log(thumb);
        let titleImgscr = thumb.children[0].children[0].attributes["src"].value;
        let titleName = detail.children[0].innerText;
        let author = detail.children[0].children[0].innerText;
        titleName = titleName.slice(0,author.length*-1)
        console.log(titleImgscr)
        console.log(titleName);
        console.log(author);
        var params={};
        document.querySelector("#content > table > tbody > tr:nth-child(3) > td:nth-child(1) > a").attributes["href"].value.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
            params[key] = value;
        });
        console.log(params);
        var msg = {
            comicId:message.comicId,
            type: 'content',
            id:message.tabId,
            src:titleImgscr,
            title:titleName,
            author:author,
            lastEpsode:params['no']
        }
        chrome.runtime.sendMessage(msg);
    }
}
