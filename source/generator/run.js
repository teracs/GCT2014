//生成index.html
var config = require("./config");
var jade =require("jade");
var request = require("request");
var fs = require("fs");
//..............................................................................
var form_Menu = {
    vid:2
}
//..............................................................................
var callback_Menu = function(err, res){
    if (err){
        console.log("Fail to retrieve menu");
    }
    else
    {
        if (res.body)
        {
            var data = JSON.parse(res.body);
        }
        else
        {
            var data = JSON.parse(res);
        }
        console.log("成功获取目录。数量：",data.length);
        var menu = [];
        for(var i in data){
          var t = data[i];
          if (!t.depth && t.name != "情景子题")
          {
            t.children = [];
            menu.push(t);
            for(var j in data)
            {
              var st = data[j];
              if (st.parents[0] == t.tid)
              {
                t.children.push(st);
              }
            }
          }
        }
        //console.log("我们得到了嵌套的目录：",menu);
        var html = jade.renderFile("tiku.jade",{menu:menu,pretty:true});
        //console.log("生成了目录HTML：",html);
        fs.writeFile(config.wwwPath + "tiku/index.html",html,function(err,data){
            if(!err)
            {
                console.log("生成了index.html");
            }
        });
    }
};

var callback_Node = function(err, res)
{
    if (err)
    {
      console.log("错误：",err);
    }
    else
    {
      if (res.body)
      {
          var node = JSON.parse(res.body);
      }
      else
      {
          var node = JSON.parse(res);
      }
      console.log("processing nid ",node.nid);
      if (node.type == "qing_jing_ti")
        var html = jade.renderFile("node_qingjingti.jade",{node:node,pretty:true});
      else if (node.type == "dan_xuan_ti")
        var html = jade.renderFile("node_danxuan.jade",{node:node,pretty:true});
      else
        var html = jade.renderFile("node.jade",{node:node,pretty:true});
      fs.writeFile(config.wwwPath + "tiku/"+ node.nid +".html",html,function(err,data){
        if(!err)
        {
            console.log("#"+node.nid,node.title);
        }
      });
    }
}

var callback_Nodes = function(err, res)
{
    if (res.body)
    {
        var nodes = JSON.parse(res.body);
    }
    else
    {
        var nodes = JSON.parse(res);
    }
    console.log("访问了node列表：",nodes.length);
    for(var i in nodes)
    {
        var node = nodes[i];
        setTimeout(
            function(){
                fs.readFile(
                    config.wwwPath + "record/node/" + this.nid + ".json",
                    callback_Node
                );
  /*
                request.get(
                this.uri + ".json",
                callback_Node
            );
   */

        }.bind(node), node.nid * 10);
  }
}
////////////////////////////////////////////////////////////////////////////////
var html = jade.renderFile("index.jade",{pretty:true});
//console.log("生成了目录HTML：",html);
fs.writeFile(config.wwwPath + "index/index.html",html,function(err,data){
    if(!err)
    {
        console.log("生成了index.html");
    }
});


fs.readFile(config.wwwPath + "record/taxonomy_vocabulary/getTree/2.json",callback_Menu);
fs.readFile(config.wwwPath + "record/node.json",callback_Nodes);
/*
request.post(
    config.endpoint + "taxonomy_vocabulary/getTree.json",
    {form:form_Menu} ,
    callback_Menu
);

request.get(
    config.endpoint + "node.json?pagesize=10000",
    callback_Nodes
);

*/
