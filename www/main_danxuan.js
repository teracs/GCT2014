
updateTitle = function(){
    var title = "[" + (parseInt(window.localStorage.currentDijidao) + 1) + "/" + window.localStorage.currentZSDLength +"]" +
        window.localStorage.currentKM + " > " + window.localStorage.currentZSD;
    $("#nodeTitle").text(title);
};

checkCorrect = function(){
    var nid = window.localStorage.currentNid;
    var node = gct2014.nodes[nid];
    //////////////////////////////
}

xiayiti = function(){
    dijidao = parseInt(window.localStorage.currentDijidao);
    dijidao += 1;
    if (dijidao < window.localStorage.currentZSDLength)
    {
        window.localStorage.currentDijidao = dijidao;
        var nid = window.localStorage.currentNid = gct2014.flat[window.localStorage.currentZid].nodes[dijidao].nid;
        $.mobile.changePage(nid + ".html");
    }
    else
    {
        $.mobile.changePage("index.html");
    }
}

$(document).on("pagecontainershow",updateTitle);