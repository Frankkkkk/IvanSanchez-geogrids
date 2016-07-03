
/*
 * 
 * This file implements a simplistic Octohedral Quaternary Triangle Mesh.
 * 
 * 
 * A location object is a plain Object that looks like:
 * 
 * {
 *		lat: Number,	// In decimal degrees, in [ -90,  90]
 *		lng: Number,	// In decimal degrees, in [-180, 180]
 * 
 *		octant: Number,	// From 0 to 7 (think "1 to 8")
 *		levels: [Number],	// An array of numbers from 0 to 3 ("1 to 4"), ID in each level.
 * 
 *		x: Number,	// The remainder x-coordinate (longitude) in the deepest computed level
 *		y: Number,	// The remainder y-coordinate (latitude) in the deepest computed level
 *		// Both x and y will be clamped to 0<x<1, 0<y<1, 0<(x+y)<1.
 * }
 */





// Given a location with at least `lat` and `lng`, compute its `octant` and
// its first `x`, `y`, `max`; then set `levels` to an empty array.
function computeOctant(location) {
	
	if (location.lat > 0) {
		if (location.lng < -90) {
			location.octant = 0;
		} else if (location.lng < 0) {
			location.octant = 1;
		} else if (location.lng < 90) {
			location.octant = 2;
		} else {
			location.octant = 3;
		}
	} else {
		if (location.lng < -90) {
			location.octant = 4;
		} else if (location.lng < 0) {
			location.octant = 5;
		} else if (location.lng < 90) {
			location.octant = 6;
		} else {
			location.octant = 7;
		}
	}
	
	// Compute remainder x,y mapping them to [0,1]
	location.x = ((location.lng + 180) % 90) / 90;
	location.y = Math.abs(location.lat) / 90;
	location.x *= (1-location.y);
	location.levels = [];
	
	return location;
}


// Given a location with `octant`, `x`, `y`, `max` and `levels`, compute the next level.
function computeLevel(location) {
	
	if (location.y > 0.5) {
		location.levels.push(1);
		location.x *= 2;
		location.y = (location.y - 0.5) * 2;
	} else if (location.y < 0.5-location.x) {
		location.levels.push(2);
		location.x *= 2;
		location.y *= 2;
	} else if (location.x >= 0.5) {
		location.levels.push(3);
		location.x = (location.x - 0.5) * 2;
		location.y *= 2;
	} else {
		// And this is an inverse triangle
		location.levels.push(0);
// 		location.x = 2*x + 2*y - 1;
		location.x = 1 - location.x*2;
		location.y = 1 - location.y*2;
	}
	
	return location;
}


// Given a location with `octant`, `x`, `y` and `max`, compute its lat-lng.
function computeLatLng(location) {
	var l = location.levels.length;
	var x = location.x;
	var y = location.y;
	
	for (var i=l-1; i>=0; i--) {
		var level = +location.levels[i];
		if (level === 1) {
			x /= 2;
			y = y/2 + 0.5;
		} else if (level === 2) {
			x /= 2;
			y /= 2;
		} else if (level === 3) {
			x = x/2 + 0.5;
			y /= 2;
		} else if (level === 0) {
			x = (1 - x)/2;
			y = (1 - y)/2;
		}
// 		console.log(level, x,y);
	}
	
	x /= 1 - y;
	x *= 90;
	y *= 90;
	
	if (location.octant == 0) {
		x -= 180;
	} else if (location.octant == 1) {
		x -= 90;
	} else if (location.octant == 2) {
		x += 0;
	} else if (location.octant == 3) {
		x += 90;
	} else if (location.octant == 4) {
		x -= 180;
		y = -y;
	} else if (location.octant == 5) {
		x -= 90;
		y = -y;
	} else if (location.octant == 6) {
		x += 0;
		y = -y;
	} else if (location.octant == 7) {
		x += 90;
		y = -y;
	}
	
	location.lat = y;
	location.lng = x;
	
	return location;
}




// Given a location, return its human-readable hash
function locationToReadableHash(location) {
	return location.octant + '' + location.levels.join('');
}

// Given a location, return its numeric hash
function locationToNumericHash(location) {
	var acc = location.octant;
	var mult = 8;
	
	for (var i in location.levels) {
		acc += mult * location.levels[i];
		mult *= 4;
	}
	return acc;
}


// Given a human-readable hash, return a location
function readableHashToLocation(hash) {
	var octant = hash[0];
	var precision = 3;
	var levels = [];
	var l = hash.length;
	var i = 1;
	while(i < l) {
		levels.push( hash[i++] );
		precision += 2;
	}
	
	return levelsToLocation(octant, levels);
}


// Given a numeric hash, return a location
// Precision needs to be given to account for leading zeroes.
function numericHashToLocation(hash, precision) {
	if (!precision) precision = 25;
	var octant = hash % 8;
	hash = Math.trunc(hash / 8);
	var i = 3;
	var levels = [];
	while(i < precision) {
		levels.push( hash % 4 );
		hash = Math.trunc(hash / 4);
		i += 2;
	}
	
	return levelsToLocation(octant, levels);
}




// Given a lat-lon and a precision (in number of bits), return a location with computed octant and levels
function latLngToPrecisionLocation(lat, lng, precision){
	var location = {lat: lat, lng: lng};
	
	computeOctant(location);
	var currPrecision = 3;
	
	while (currPrecision < precision) {
		computeLevel(location);
		currPrecision += 2;
	}
	return (location);
}

// Given octant and levels, return a location with back-computed lat-lng.
function levelsToLocation(octant, levels, x, y) {
	if (x === undefined) x = 0.3;
	if (y === undefined) y = 0.3;
	
	var location = {
		octant: octant,
		levels: typeof levels === 'String' ? levels.split() : levels,
		x: x,
		y: y
	}
	
	return computeLatLng(location);
}


// Given octant and levels, return three locations with back-computed lat-lng.
function levelsToTriangle(octant, levels, normalizePoles) {
	
	if (typeof(levels) === 'String') {
		levels = levels.split();
	}
	
	var location1 = {
		octant: octant,
		levels: levels,
		x: 0,
		y: 0
	}
	
	var location2 = {
		octant: octant,
		levels: levels,
		x: 0,
		y: 1
	}
	
	var location3 = {
		octant: octant,
		levels: levels,
		x: 1,
		y: 0
	}
	
	computeLatLng(location1);
	computeLatLng(location2);
	computeLatLng(location3);
	
	if (normalizePoles) {
		//Edge case: the triangle has a pole, return a square instead of a triangle.
		if (Math.abs(location2.lat) == 90) {
			var location2a = {
				octant: octant,
				levels: levels,
				x: 0,
				y: 1,
				lat: location2.lat,
				lng: location1.lng
			}
			var location2b = {
				octant: octant,
				levels: levels,
				x: 0,
				y: 1,
				lat: location2.lat,
				lng: location3.lng
			}
			return [location1,location2a,location2b,location3];
		}
	}
	
	return [location1,location2,location3];
}


///// Exported functions

function latLngToReadableHash(lat, lng, precision) {
	var loc = latLngToPrecisionLocation(lat, lng, precision);
	return locationToReadableHash(loc);
}

function latLngToNumericHash(lat, lng, precision) {
	var loc = latLngToPrecisionLocation(lat, lng, precision);
	return locationToNumericHash(loc);
}

function numericHashToLatLng(hash, precision) {
	var loc = numericHashToLocation(hash, precision);
	return {lat: loc.lat, lng: loc.lng };
}

function readableHashToLatLng(hash) {
	var loc = readableHashToLocation(hash);
	return {lat: loc.lat, lng: loc.lng };
}

function numericHashToArea(hash, precision) {
	var loc = numericHashToLocation(hash);
	return levelsToTriangle(loc.octant, loc.levels, true);
}

function readableHashToArea(hash) {
	var loc = readableHashToLocation(hash);
	return levelsToTriangle(loc.octant, loc.levels, true);
}


var hashPrecisions = [];
for (var i = 3; i < 60; i+=2) {
	hashPrecisions .push(i);
}

console.log(hashPrecisions);


/// FIXME: Do some UMD, or some post-processing.
if (!window) {
	module.exports = {
// 		computeOctant             : computeOctant            ,
// 		computeLevel              : computeLevel             ,
// 		computeLatLng             : computeLatLng            ,
// 		locationToReadableHash    : locationToReadableHash   ,
// 		locationToNumericHash     : locationToNumericHash    ,
// 		latLngToPrecisionLocation : latLngToPrecisionLocation,
// 		levelsToLocation          : levelsToLocation         ,
// 		levelsToTriangle          : levelsToTriangle
		hashPrecisions       : hashPrecisions       ,
		latLngToReadableHash : latLngToReadableHash ,
		latLngToNumericHash  : latLngToNumericHash  ,
		numericHashToLatLng  : numericHashToLatLng  ,
		readableHashToLatLng : readableHashToLatLng ,
		numericHashToArea    : numericHashToArea    ,
		readableHashToArea   : readableHashToArea   
	}
}

