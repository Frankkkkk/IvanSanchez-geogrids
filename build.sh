
# This small shell script just moves files around and packs the JS

mkdir -p websites/what3fucks/js

node_modules/.bin/rollup src/what3fucks.js > websites/what3fucks/js/what3fucks.js

cp node_modules/leaflet/dist/leaflet.js websites/what3fucks/js/
cp node_modules/leaflet/dist/leaflet.css websites/what3fucks/css/






