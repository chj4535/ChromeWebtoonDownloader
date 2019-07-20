console.log("heelo?");



chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message,sender,sendResponse) {
    console.log(message,"message receive");
    switch(message.type){
        case "BackToCon_NaverComicInfo":
            let comicinfo = document.querySelector('.comicinfo');
            console.log(comicinfo);
            let detail = comicinfo.querySelector('.detail');
            console.log(detail);
            let thumb = comicinfo.querySelector('.thumb');
            console.log(thumb);
            let titleImgscr = thumb.children[0].children[0].attributes["src"].value;
            let titleName = detail.children[0].innerText;
            let author = detail.children[0].children[0].innerText;
            document.querySelector("#content > div.section_cont.wide > div.tit_area > div.view > h3")
            let episode = message.episode;
            let episodeName = document.querySelector("#content > div.section_cont.wide > div.tit_area > div.view > h3").innerText;
            titleName = titleName.slice(0,author.length*-1)
            console.log(titleImgscr)
            console.log(titleName);
            console.log(author);
            var msg = {
                comicId: message.comicId,
                type: 'ConToBack_SaveTabComicInfo',
                id: message.tabId,
                src: titleImgscr,
                title: titleName,
                author: author,
                episode: episode,
                episodeName:episodeName,
                company: "Naver"
            };
            chrome.runtime.sendMessage(msg);
            break;
        case "BackToCon_GetComicList":
            console.log("BackToCon_GetComicList");
            var imageList=[];
            let imgNodes = document.querySelector('.wt_viewer').children;
            console.log(imgNodes)
            for(imgNode of imgNodes){
                var scrValue =imgNode.attributes["src"].value;
                //$.ajax({ url:scrValue, success: function(data) { console.log(data); } });
                imageList.push(scrValue);
            }
            console.log(imageList);
            var msg = {
                tabId:message.tabId,
                type: 'ConToBack_ReturnImageList',
                imageList:imageList
            };
            chrome.runtime.sendMessage(msg);
            break;
    }
}
