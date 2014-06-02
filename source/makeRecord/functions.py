import requests
import config

def getResource(url):
  if url[-5:] != ".json":
   url += ".json"
  r = requests.get( config.endpoint + url)
  return r.json()
