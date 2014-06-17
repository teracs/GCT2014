function gotoZSD(kid, tid, dijidao)
{
    window.localStorage.status="zhishidian";
    window.localStorage.currentKid = kid;
    window.localStorage.currentKM = window.flat_term[kid].name;
    window.localStorage.currentZid = tid;
    window.localStorage.currentZSD = window.flat_term[tid].name;
    window.localStorage.currentZSDLength = window.flat_term[tid].nodes.length;
    dijidao = dijidao || 0;
    window.localStorage.currentDijidao = dijidao;
    var nid = window.localStorage.currentNid = window.flat_term[tid].nodes[dijidao].nid;
    $.mobile.changePage(nid + ".html");
};