
# This small shell script just moves files around and packs the JS

mkdir -p websites/what3fucks/js
mkdir -p dist
rm dist/*

node_modules/.bin/rollup src/api.js > dist/geogrids-es6.js
node_modules/.bin/rollup src/api-es5.js > dist/geogrids-es5.tmp.js
node_modules/.bin/buble --no modules dist/geogrids-es5.tmp.js -o dist/geogrids-es5.js
rm dist/geogrids-es5.tmp.js
node_modules/.bin/browserify dist/geogrids-es5.js -o dist/geogrids-es5-umd.js

for i in what3fucks what3pokemon what3ikea what3goshdarnits; do
	echo $i;

	node_modules/.bin/rollup src/$i.js   | \
		node_modules/.bin/buble --no modules > websites/$i/js/$i.js

	mkdir -p websites/$i/css/
	mkdir -p websites/$i/js/

	cp node_modules/leaflet/dist/leaflet.css websites/$i/css/
	cp node_modules/leaflet/dist/leaflet.js websites/$i/js/

	cp node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css websites/$i/css/
	cp node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.js  websites/$i/js/

	cp node_modules/leaflet.photon/leaflet.photon.css     websites/$i/css/
	cp node_modules/leaflet.photon/leaflet.photon.js      websites/$i/js/

	cp node_modules/bootstrap/dist/css/bootstrap.min.css  websites/$i/css/
	cp node_modules/bootstrap/dist/js/bootstrap.min.js    websites/$i/js/

	cp node_modules/bootstrap/dist/css/bootstrap.min.css  websites/$i/css/
	cp node_modules/bootstrap/dist/js/bootstrap.min.js    websites/$i/js/

	cp node_modules/jquery/dist/jquery.min.js             websites/$i/js/


done;
