function Crawler(){

}

Crawler.prototype.DownNaverComic= function(titleId,no){
    var data =window.open("https://comic.naver.com/webtoon/detail.nhn?titleId=131385&no=410&weekday=thu","_self")
    var result = data.document.getElementById("wrap");
    return data;
}