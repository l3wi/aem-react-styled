The main OSGI service is the ReactScriptEngineFactory which has the following
properties:

name | description
---|---
scripts.paths | resource paths to the javascript files for the server
pool.total.size | pool size for nashorn engines. Correlates with the number of concurrent requests
scripts.reload | whether changes to javascript file should be observed
subServiceName | subService name for accessing the crx. If left blank then the deprecated admin is used.



