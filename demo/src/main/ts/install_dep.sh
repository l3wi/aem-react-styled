#!/bin/bash
#rm -f ../../../../../aem-react-js/aem-react-js*
cd ../../../../../aem-react-js/
npm pack
cd ../aem-react/demo/src/main/ts
rm -rf node_modules/aem-react-js
npm install