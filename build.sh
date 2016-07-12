
# This small shell script just moves files around and packs the JS

mkdir -p websites/what3fucks/js
mkdir -p dist
rm dist/*

node_modules/.bin/rollup src/what3fucks.js > websites/what3fucks/js/what3fucks.js
node_modules/.bin/rollup src/what3pokemon.js > websites/what3pokemon/js/what3pokemon.js

node_modules/.bin/rollup src/api.js > dist/geogrids-es6.js
node_modules/.bin/rollup src/api-es5.js > dist/geogrids-es5.tmp.js
node_modules/.bin/buble --no modules dist/geogrids-es5.tmp.js -o dist/geogrids-es5.js
rm dist/geogrids-es5.tmp.js
node_modules/.bin/browserify dist/geogrids-es5.js -o dist/geogrids-es5-umd.js


cp node_modules/leaflet/dist/leaflet.css websites/what3fucks/css/
cp node_modules/leaflet/dist/leaflet.js websites/what3fucks/js/

cp node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css websites/what3fucks/css/
cp node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.js  websites/what3fucks/js/

cp node_modules/leaflet.photon/leaflet.photon.css     websites/what3fucks/css/
cp node_modules/leaflet.photon/leaflet.photon.js      websites/what3fucks/js/

cp node_modules/bootstrap/dist/css/bootstrap.min.css  websites/what3fucks/css/
cp node_modules/bootstrap/dist/js/bootstrap.min.js    websites/what3fucks/js/

cp node_modules/bootstrap/dist/css/bootstrap.min.css  websites/what3fucks/css/
cp node_modules/bootstrap/dist/js/bootstrap.min.js    websites/what3fucks/js/

cp node_modules/jquery/dist/jquery.min.js             websites/what3fucks/js/



cp node_modules/leaflet/dist/leaflet.css              websites/what3pokemon/css/
cp node_modules/leaflet/dist/leaflet.js               websites/what3pokemon/js/

cp node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css websites/what3pokemon/css/
cp node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.js  websites/what3pokemon/js/

cp node_modules/leaflet.photon/leaflet.photon.css     websites/what3pokemon/css/
cp node_modules/leaflet.photon/leaflet.photon.js      websites/what3pokemon/js/

cp node_modules/bootstrap/dist/css/bootstrap.min.css  websites/what3pokemon/css/
cp node_modules/bootstrap/dist/js/bootstrap.min.js    websites/what3pokemon/js/

cp node_modules/bootstrap/dist/css/bootstrap.min.css  websites/what3pokemon/css/
cp node_modules/bootstrap/dist/js/bootstrap.min.js    websites/what3pokemon/js/

cp node_modules/jquery/dist/jquery.min.js             websites/what3pokemon/js/


