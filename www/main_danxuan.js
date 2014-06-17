
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
        var nid = window.localStorage.currentNid = window.flat_term[window.localStorage.currentZid].nodes[dijidao].nid;
        $.mobile.changePage(nid + ".html");
    }
    else
    {
        $.mobile.changePage("index.html");
    }
}

$(document).on("pagecontainershow",updateTitle);