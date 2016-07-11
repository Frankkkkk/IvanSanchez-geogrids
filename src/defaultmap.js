

// Default map stuff, assumes that 'gdgg' and 'bases' are already defined


export default function initMap(gdgg, bases, site, version) {

	// Do stuff on a leaflet map

	let map = new L.Map('map', {fadeAnimation: false});

	let osm = L.tileLayer('http://{s}.osm.maptiles.xyz/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		maxNativeZoom: 18,
		maxZoom: 19
	}).addTo(map);

	L.control.scale().addTo(map);

	map.fitWorld();

	// Init photon search
	var searchControl = new L.Control.Photon({
		placeholder: 'Enter shitty place name here',
		onSelected: L.Util.falseFn,
		feedbackEmail: null
	}).addTo(map);

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
				window.location.hash = hashStr.replace(/ /g, '_');


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

				searchControl.search.input.value = hashStr;

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
			let center = gdgg.numericHashToLatLng(hashAndPrecision.hash, hashAndPrecision.precision);

			precision = 0;
			for (let i in validPrecisions) {
				if (validPrecisions[i] < hashAndPrecision.precision) {
					precision = Math.max(validPrecisions[i], precision);
				}
			}

			highlightArea(center.lat, center.lng, true, precision);
		}
	}

	searchControl.on('selected', (ev)=>{
// 		console.log(ev);

		if ('choice' in ev && 'properties' in ev.choice && 'extent' in ev.choice.properties) {
			var ex = ev.choice.properties.extent;
			ev.choice.properties.bounds = L.latLngBounds( [ ex[1], ex[0] ], [ ex[3], ex[2] ] );
		}

		if ('bounds' in ev.choice.properties) {
// 			console.log('feature bounds',ev.choice.properties.bounds);

			var center = ev.choice.properties.bounds.getCenter();

			if ('precision' in ev.choice.properties) {
				let precision = 0;
				for (let i in validPrecisions) {
					if (validPrecisions[i] < ev.choice.properties.precision) {
						precision = Math.max(validPrecisions[i], precision);
					}
				}
				highlightArea(center.lat, center.lng, true, precision);
			} else {
				map.fitBounds(ev.choice.properties.bounds);
				highlightArea(center.lat, center.lng, true);
			}
// 			searchControl.collapse();
// 			console.log('map bounds',map.getBounds());
		}
	});

	// Hijack calls to the Photon search API and see if the string fits a GDGG hash
	// Just an ugly way of decorating the L.PhotonBaseSearch methods in-place.
	searchControl.search._doSearch = function() {
// 		console.log(this.CACHE);

		var hashAndPrecision = bases.stringToHash(this.CACHE);

		if (hashAndPrecision) {
			// Create a synthetic result and hijack it into the list
			var bounds = L.polygon(gdgg.numericHashToArea( hashAndPrecision.hash, hashAndPrecision.precision )).getBounds();
			var latlng = gdgg.numericHashToLatLng(hashAndPrecision.hash, hashAndPrecision.precision);
			var result = { geometry: { coordinates: [latlng.lng, latlng.lat], type: 'Point'}, properties: {}};
// 			result.properties.label = this.CACHE;
			result.properties.name = this.CACHE;
			result.properties.bounds = bounds;
			result.properties.precision = hashAndPrecision.precision;

			return this.handleResults({
				type: 'FeatureCollection',
				features: [result]
			});

		} else {
			// Search normally
			L.PhotonBaseSearch.prototype._doSearch.call(this);
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



