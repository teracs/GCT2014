
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

showAnswer = function ()
{
    $(".input_choice").attr("disabled","disabled");
    var nid = window.localStorage.currentNid;
    var node = gct2014.nodes[nid];
    var correctAnswer = node.field__xuan_xiang.und[0].value;
    var selectedAnswer = $(this).attr("choice");
    console.log("selectedAnswer",selectedAnswer,"correctAnswer",correctAnswer);
    if (correctAnswer != selectedAnswer)
    {
        $(this).addClass("ui-icon-delete ui-btn-b ui-shadow");
    }
    $(".field_choice[choice='" + correctAnswer + "']").addClass("ui-icon-check ui-shadow");
    $(".correctAnswer").collapsible({ collapsed: false });
    //$(this).checkboxradio( "refresh" );
}

$(document).on("click",".field_choice",showAnswer);

$(document).on("pagecontainershow",updateTitle);