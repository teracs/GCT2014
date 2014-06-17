//生成index.html
var config = require("./config");
var jade =require("jade");
var request = require("request");
var fs = require("fs");


var form_Menu = {
  vid:2
}
var callback_Menu = function(err, res){
  if (err){
    console.log("Fail to retrieve menu");
  }
  else{
    var menu = [];
    var data = JSON.parse(res.body);
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
    var html = jade.renderFile("index.jade",{menu:menu,pretty:true});
    //console.log("生成了目录HTML：",html);
    fs.writeFile(config.wwwPath + "dist/index.html",html,function(err,data){
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
      var node = JSON.parse(res.body);
      if (node.field_choice_d && node.field_choice_d.und)
        var html = jade.renderFile("node_danxuan.jade",{node:node,pretty:true});
      else
        var html = jade.renderFile("node.jade",{node:node,pretty:true});
      fs.writeFile(config.wwwPath + "dist/"+ node.nid +".html",html,function(err,data){
        if(!err)
        {
            console.log("#"+node.nid,node.title);
        }
      });
    }
}

var callback_Nodes = function(err, res)
{
  var nodes = JSON.parse(res.body);
  console.log("访问了node列表：",nodes.length);
  for(var i in nodes)
  {
    var node = nodes[i];
    setTimeout(function(){
      request.get(
      this.uri + ".json",
      callback_Node
      );
    }.bind(node), node.nid * 500);
  }
}

request.post(
    config.endpoint + "taxonomy_vocabulary/getTree.json",
    {form:form_Menu} ,
    callback_Menu
  );
request.get(
  config.endpoint + "node.json?pagesize=10000",
  callback_Nodes
  );

