#encoding: utf-8
import requests,json,os
import config

# 传入一个resource的名字，返回该resource的dict
def getResource(resource, postDict = False):
  if resource.find(".json") == -1:
   resource += ".json"
  print resource
  if not postDict:
    r = requests.get( config.endpoint + resource)
  else:
    r = requests.post(config.endpoint + resource,postDict)
  try:
    rjson = r.json()
    return rjson
  except:
    print "Fail to Stringify",r.text


#传入一个resource的名字，则将它存入指定文件
def saveResource(resource, postDict = False, changeFunction = False):
  d = getResource(resource, postDict)
  if changeFunction:
    changeFunction(d)
  if config.indent:
    s = json.dumps(d,indent=config.indent)
  else:
    s = json.dumps(d)

  basename = resource.split("?")[0]
  if basename.find(".json") == -1:
    basename += ".json"
  if not postDict:
    filename = config.outputFolder + basename
  else:
    key = postDict["key"]
    filename = config.outputFolder + resource + "/" + postDict[key] + ".json"
  dirname = os.path.dirname(filename)
  if not os.path.exists(dirname):
    os.makedirs(dirname)
  f = open(filename, "w")
  f.write(s)
  f.close()
  return d
