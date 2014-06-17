if(!window.gct2014)
{
    $.getJSON("../record/taxonomy_vocabulary/getTree/2.json", function(taxonomy_vocabulary){
        window.gct2014 = {};
        window.taxonomy_vocabulary = taxonomy_vocabulary;
        window.flat_term = {}
        for (var i in taxonomy_vocabulary)
        {
            var t = taxonomy_vocabulary[i];
            if(t.depth == 0)
            {
                t.children = {};
                window.gct2014[t.tid] = t;
            }
            window.flat_term[t.tid] = t;
        }
        for (var i in taxonomy_vocabulary)
        {
            var t = taxonomy_vocabulary[i];
            if(t.depth == 1)
            {
                t.nodes = [];
                var pid = parseInt(t.parents[0])
                window.gct2014[pid].children[t.tid] = t;
            }
        }
        $.getJSON("../record/node.json", function(nodes){
            window.timuIndex = nodes;
            for(var i in nodes)
            {
                $.getJSON("../record/node/"+nodes[i].nid + ".json", function(node)
                {
                    try{
                        var km = node.field_suoshuzhishidian.und[0].tid;
                        var zsd = node.field_suoshuzhishidian.und[1].tid;
                        gct2014[km].children[zsd].nodes.push(node);
                        if($(".zhishidian").length)
                        {
                            var zsdcnt = $("#zsd_" + zsd + " .ui-li-count");
                            var cnt = parseInt(zsdcnt.text());
                            //console.log("set zsd",zsd,"count",cnt, "+1");
                            zsdcnt.text(1 + cnt);
                        }
                    }catch(e){}
                });
            }
        });
    });
}
