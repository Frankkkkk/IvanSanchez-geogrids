

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

	function highlightArea(lat, lng, pop) {
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


				map.fitBounds(polygon.getBounds());

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
	
	
}



