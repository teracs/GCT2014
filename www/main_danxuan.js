
updateTitle = function(){
    var title = "[" + window.localStorage.currentDijidao + "/" + window.localStorage.currentZSDLength +"]" +
        window.localStorage.currentKM + " > " + window.localStorage.currentZSD;
    $("#nodeTitle").text(title);
};

xiayiti = function(){
    dijidao = parseInt(window.localStorage.currentDijidao);
    dijidao += 1;
    if (dijidao <= window.localStorage.currentZSDLength)
    {
        window.localStorage.currentDijidao = dijidao;
        var nid = window.localStorage.currentNid = gct2014.flat[window.localStorage.currentZid].nodes[dijidao - 1].nid;
        $.mobile.changePage(nid + ".html");
    }
    else
    {
        $.mobile.changePage("index.html");
    }
}

$(document).on("pagecontainershow",updateTitle);