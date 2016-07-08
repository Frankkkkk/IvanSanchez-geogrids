

// Default map stuff, assumes that 'gdgg' and 'bases' are already defined


export default function initMap(gdgg, bases, site, version) {

	// Do stuff on a leaflet map

	let map = new L.Map('map', {fadeAnimation: false, zoomSnap: 0.25});

	let osm = L.tileLayer('http://{s}.osm.maptiles.xyz/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		maxNativeZoom: 18,
		maxZoom: 19
	}).addTo(map);

	L.control.scale().addTo(map);

	map.fitWorld();


	let precisionLimit = 45;
	let clickPolygon, popup, hoverPolygon, hashCenterCircle;
	let lastHash;
	let persistentHash;


	// Find precisions given the GDGG ones and the bases' ones.
	let validPrecisions = [];
	for (let i in bases.precisions) {
		let max = 0;
		for (let j in gdgg.hashPrecisions) {
			if (bases.precisions[i] > gdgg.hashPrecisions[j]) {
				max = Math.max(gdgg.hashPrecisions[j], max);
			}
		}
		if (max && validPrecisions.indexOf(max) === -1 && max <= precisionLimit) {
			validPrecisions.push(max);
		}
	}

	let precision = validPrecisions[0];

	// 	console.log(validPrecisions);

	map.on('zoomend', function(ev) {
		// Find the smallest precision that fits within the entire bounds
		let mapCenter = map.getCenter();
		let mapZoom = map.getZoom();
		precision = validPrecisions[0];
		for (let i in validPrecisions) {
			let p = validPrecisions[i];
			let hash = gdgg.latLngToReadableHash(mapCenter.lat, mapCenter.lng, p);
			let trig = gdgg.readableHashToArea(hash);
			let bounds = L.polygon(trig).getBounds();
			let boundsZoom = map.getBoundsZoom(bounds)
			if (boundsZoom <= mapZoom) {
				precision = validPrecisions[+i + 1] || p;
			}
		}
	});

	function highlightArea(lat, lng, pop, forcedPrecision) {

		if (typeof forcedPrecision === 'number') {
			precision = forcedPrecision;
		}

		let hash = gdgg.latLngToReadableHash(lat, lng, precision);

		let polygon = pop ? clickPolygon : hoverPolygon;

		if (pop || lastHash != hash) {

			let trig = gdgg.readableHashToArea(hash);

			if (polygon) {
				map.removeLayer(polygon);
				map.removeLayer(hashCenterCircle);
	// 				popup.close();
			}
	// 			console.log(trig);


			polygon = L.polygon(trig, {
				fillOpacity: 0,
				color: pop ? 'black' : '#404040',
				weight: pop ? 4 : 1
			}).addTo(map);

			let numericHash = gdgg.latLngToNumericHash(lat, lng, precision);
	// 			let newPrecision = validPrecisions[ validPrecisions.indexOf(precision) + 1 ] || precision;

			hashCenter = gdgg.numericHashToLatLng(numericHash, precision);

			hashCenterCircle = L.circleMarker(hashCenter, {radius: 3, fill: false, color: 'black', weight: 1}).addTo(map);

			if (pop) {
				let hashStr = persistentHash = bases.hashToString(numericHash, precision);

				let text = '<div>' + hashStr + '</div>'
					;

// 				window.location.hash = version + '/' + hashStr
				window.location.hash = hashStr


	// 			let text = '<div>Numeric hash: ' + numericHash + '</div>' +
	// 				'<div>Readable hash: ' + hash + '</div>' +
	// 				'<div>Syllabes: ' + hashStr + '</div>' +
	// 				'<div>Precision: ' + precision + ' bits</div>'
	// 				;

				polygon.bindPopup(text, {
					autoPan: false,
	// 					closeButton: false
				}).openPopup(hashCenter);


				map.fitBounds(polygon.getBounds().pad(0.2));

				clickPolygon = polygon;


			} else {
				hoverPolygon = polygon;
			}

			lastHash = hash;
		}
	}

	map.on('click', function(ev) {
		highlightArea(ev.latlng.lat, ev.latlng.lng, true);
	});

	map.on('mousemove', function(ev) {
		highlightArea(ev.latlng.lat, ev.latlng.lng, false);
	});

	// If the URL has a hash, use it to locate the first center
	if (window.location.hash) {
		let str = window.location.hash.replace('#','');

		let hashAndPrecision = bases.stringToHash(decodeURI(str));

		if (hashAndPrecision) {
			let center = gdgg.numericHashToLatLng(hashAndPrecision.hash);

			precision = 0;
			for (let i in validPrecisions) {
				if (validPrecisions[i] < hashAndPrecision.precision) {
					precision = Math.max(validPrecisions[i], precision);
				}
			}

			highlightArea(center.lat, center.lng, true);
		}
	}


	// Init mapzen search
	var searchControl = L.control.geocoder('search-4E9grQP', {
		pointIcon: false,
		polygonIcon: false,
		markers: false,
		panToPoint: false,
// 		expanded: true,
		position: 'topright',
		placeholder: 'Enter shitty place name here'
	}).addTo(map);

	searchControl.on('results', (ev)=>{
		console.log(ev);
	});

	searchControl.on('select', (ev)=>{
		console.log(ev.feature);

		var temp = L.GeoJSON.geometryToLayer(ev.feature.geometry);
		if ('getBounds' in temp) {
			// lines, polys
			map.fitBounds(temp.getBounds());
		} else if ('bounds' in ev.feature.properties) {

			console.log('feature bounds',ev.feature.properties.bounds);

			// lines, polys
// 			precision = ev.feature.properties.precision;
			map.fitBounds(ev.feature.properties.bounds);
			var center = map.getCenter();

			let precision = 0;
			for (let i in validPrecisions) {
				if (validPrecisions[i] < ev.feature.properties.precision) {
					precision = Math.max(validPrecisions[i], precision);
				}
			}

			highlightArea(center.lat, center.lng, true, precision);
			searchControl.collapse();
			console.log('map bounds',map.getBounds());
		} else {
			var zoom;
			var lay = ev.feature.properties.layer;
			if (lay === 'country') {
				zoom = 3;
			} else if (lay === 'macroregion') {
				zoom = 4;
			} else if (lay === 'region') {
				zoom = 6;
			} else if (lay === 'macrocounty') {
				zoom = 8;
			} else if (lay === 'county') {
				zoom = 10;
			} else if (lay === 'locality') {
				zoom = 12;
			} else if (lay === 'localadmin') {
				zoom = 14;
			} else if (lay === 'neighbourhood') {
				zoom = 16;
			}

			map.setZoom(zoom);
			var center = map.getCenter();
			highlightArea(center.lat, center.lng, true);
			searchControl.collapse();
		}
	});

	// Hijack calls to the Pelias search API and see if the string fits a GDGG hash
	// Just an ugly way of decorating the L.Control.Geocoder methods in-place.
	searchControl.callPelias = function(endpoint, params, type) {

		var hashAndPrecision = bases.stringToHash(params.text.trim());

// 		console.log('Hijacking a search API call,', params.text, hashAndPrecision);

		if (hashAndPrecision) {
			// Create a synthetic result and hijack it into the list
			var bounds = L.polygon(gdgg.numericHashToArea( hashAndPrecision.hash, hashAndPrecision.precision )).getBounds();
			var latlng = gdgg.numericHashToLatLng(hashAndPrecision.hash, hashAndPrecision.precision);
			var result = { geometry: { coordinates: [latlng.lng, latlng.lat], type: 'Point'}, properties: {}};
			result.properties.label = params.text;
			result.properties.bounds = bounds;
			result.properties.precision = hashAndPrecision.precision;

// 			console.log(latlng, precision);

			var lay;
			if (precision < 5) {
				lay = 'country';
			} else if (precision < 10) {
				lay = 'macroregion';
			} else if (precision < 15) {
				lay = 'region';
			} else if (precision < 20) {
				lay = 'macrocounty';
			} else if (precision < 25) {
				lay = 'county';
			} else if (precision < 30) {
				lay = 'locality';
			} else if (precision < 35) {
				lay = 'localadmin';
			} else {
				lay = 'neighbourhood';
			}

			result.properties.layer = lay;
			this.showResults([result], params.text);
		} else {
			// Search as normal
			L.Control.Geocoder.prototype.callPelias.call(this, endpoint, params, type);
		}
	}





	var locationControl = L.control.locate({
		position: 'topright',
		setView: 'once',
		drawCircle: false,
		drawMarker: false
	}).addTo(map);

	// Overload the geocoding awesome-markers image with a UTF8 glyph
	var locateSpan = document.querySelector('div.leaflet-control-locate span');
	locateSpan.innerHTML = '⌖';
	locateSpan.style.fontSize = '2em';

	map.on('locationfound', function(ev){
		var tempCircle = L.circle(ev.latlng, {radius: ev.accuracy}).addTo(map);
		map.fitBounds(tempCircle.getBounds());
		map.removeLayer(tempCircle);
		locationControl.stop();
		setTimeout(function(){
			var center = map.getCenter();
			highlightArea(center.lat, center.lng, true);
		}, 500);
	});

}



