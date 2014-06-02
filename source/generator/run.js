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
    fs.writeFile(config.wwwPath + "index.html",html,function(err,data){
        if(!err)
        {
            console.log("生成了index.html");
        }
    });
  }
};

request.post(
    config.endpoint + "taxonomy_vocabulary/getTree.json",
    {form:form_Menu} ,
    callback_Menu
  );


