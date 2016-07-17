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

// export hashPrecisions;


var oqtm = Object.freeze({
	latLngToReadableHash: latLngToReadableHash,
	latLngToNumericHash: latLngToNumericHash,
	numericHashToLatLng: numericHashToLatLng,
	readableHashToLatLng: readableHashToLatLng,
	numericHashToArea: numericHashToArea,
	readableHashToArea: readableHashToArea,
	hashPrecisions: hashPrecisions
});

var goshdarnits = [
  'airhead',
  'all-mighty',
  'argle-bargle',
  'baboon',
  'backdoor',
  'backside',
  'badbreath',
  'bajeezus',
  'balderdash',
  'barf-breath',
  'beachhouse',
  'beanbag',
  'birdbrain',
  'blabbermouth',
  'bland-bananas',
  'blarf',
  'blasted',
  'blathering',
  'bleedin',
  'blimey',
  'blockhead',
  'bloody',
  'blowhard',
  'bocce-balls',
  'bogus',
  'bollocks',
  'bologna',
  'bonehead',
  'boner',
  'boob',
  'booger-breath',
  'booger-butt',
  'booger-face',
  'boogers',
  'boogie-face',
  'boom-boom',
  'booty',
  'braggart',
  'brass-pony',
  'brat',
  'broken-britches',
  'brown-sugar',
  'bubble-butt',
  'bull-hockey',
  'bullspit',
  'bully',
  'bum',
  'bum-bailey',
  'bum-grapes',
  'bumbum',
  'bumhole',
  'bummer',
  'bumwad',
  'bunghole',
  'bungle-squid',
  'bunk-grimbler',
  'buns',
  'burp',
  'butt',
  'butt-brain',
  'butt-burglar',
  'butt-clown',
  'butt-dumpling',
  'butt-goblin',
  'butt-horn',
  'butt-knocker',
  'butt-lover',
  'butt-monkey',
  'butt-mouth',
  'butt-paste',
  'butt-putty',
  'butt-sniffer',
  'butt-thunder',
  'butt-tornado',
  'butt-trumpet',
  'butt-ventriloquist',
  'butt-wipe',
  'buttcheek',
  'buttcrack',
  'butthash',
  'butthead',
  'butthole',
  'buttmunch',
  'buttock',
  'buttscratch',
  'caca',
  'cheeky',
  'cheese-and-crackers',
  'chimp',
  'chowderhead',
  'chucklehead',
  'chump',
  'churlish',
  'clod',
  'cockroach',
  'codger',
  'codpiece',
  'codswallop',
  'constarn-it',
  'cooky',
  'coot',
  'cornnuts',
  'cotton-head',
  'cow-patty',
  'coxcomb',
  'crackerjack',
  'crap',
  'crap-o-mundo',
  'crap-slapper',
  'crap-twiddling',
  'crapola',
  'crapple',
  'crappy',
  'crassbasket',
  'cretin',
  'crikey',
  'crimeny',
  'crinkleberry',
  'cripes',
  'crud',
  'crum-bum',
  'crumby',
  'crybaby',
  'curses',
  'dad-sizzle',
  'dadgum',
  'dadgumit',
  'dagnabbit',
  'dang',
  'dangit',
  'darn',
  'darn-tootin',
  'darn-tootin',
  'darnit',
  'derriere',
  'deuce',
  'diarrhea',
  'dillhole',
  'dillwad',
  'dillweed',
  'dimwit',
  'ding-dong',
  'dingbat',
  'dingleberry',
  'dingus',
  'dink',
  'dipstick',
  'dirtbag',
  'dirtball',
  'dishcloth',
  'dodo',
  'dodo-head',
  'doggone',
  'doggonit',
  'doggy-doo',
  'doink',
  'dolt',
  'dong',
  'donger',
  'donk',
  'donkey',
  'donkey-biscuit',
  'donut-holes',
  'doodie',
  'doodie-nose',
  'doodoo',
  'doodoo-brains',
  'doodoo-head',
  'dookie',
  'doozie',
  'dope',
  'dork',
  'doxy',
  'drat',
  'dullard',
  'dumb',
  'dumbbell',
  'dumbo',
  'dumdum',
  'dummy',
  'dump',
  'dump-fumbler',
  'dumplestiltskin',
  'dumpling',
  'dunce',
  'dust-magnet',
  'dweeb',
  'eat-my-shorts',
  'effin',
  'egads',
  'egghead',
  'f-bomb',
  'fannie',
  'farfegnugen',
  'farkle',
  'fart',
  'fart-face',
  'fart-whisperer',
  'farthead',
  'fartknocker',
  'feckless',
  'fiddlesticks',
  'fig-newtons',
  'flapdoodle',
  'flea-bitten',
  'flim-flam',
  'flip',
  'flippin-flapper',
  'flying-saucers',
  'fooey',
  'fool',
  'foolhardy',
  'for-petes-sake',
  'fork',
  'frack',
  'frag',
  'freaking',
  'frick',
  'frick-frack',
  'frickin',
  'friggin',
  'fudge',
  'fudge-nuggets',
  'fudgecicles',
  'funky',
  'gadsbudlikins',
  'gadzooks',
  'garsh',
  'garsh-darn',
  'gas-blast',
  'gee-willikers',
  'geek',
  'glory-me',
  'golly',
  'golly-gee',
  'gonad',
  'goober',
  'goober-brains',
  'goober-shavings',
  'goober-thief',
  'good-for-nuthin',
  'good-grief',
  'good-night',
  'goodness',
  'goofy',
  'googley-moogley',
  'goon',
  'gorgeous-grandma',
  'goshdangit',
  'goshdarn',
  'goshdarnit',
  'gracious',
  'great-scott',
  'grime-spangler',
  'grin-swisher',
  'grits-and-gravy',
  'groin',
  'grouch',
  'grump-droppings',
  'grunt-chortler',
  'gunk-thumping',
  'H-E-double-hockey-sticks',
  'halfwit',
  'hampster',
  'harebrained',
  'harpy',
  'heavens-to-betsy',
  'heck',
  'heck-raising',
  'heebee-jeebees',
  'hiney',
  'hinus',
  'hocus-pocus',
  'hog',
  'hogswallop',
  'hogwash',
  'holy-cow',
  'holy-crapola',
  'holy-frijoles',
  'holy-guacamole',
  'holy-moley',
  'holy-ship',
  'holy-wow',
  'hoochie',
  'hoochie-coochie',
  'horse-apples',
  'horse-feathers',
  'horse-pucky',
  'hosed',
  'hoser',
  'hotheaded',
  'hush',
  'idiot',
  'ignoramus',
  'ill-bred',
  'imbecile',
  'inept',
  'jackanapes',
  'jeepers',
  'jeez',
  'jeez-louise',
  'jelly-brained',
  'jerk',
  'jiggery-pokery',
  'jimminy-crickets',
  'jinkies',
  'judas-priest',
  'jumpin-jehosephat',
  'junk-sling',
  'junknuts',
  'knave',
  'knob',
  'knucklehead',
  'leapin-lizards',
  'lickspittle',
  'lily-livered',
  'loaf-whittler',
  'louse',
  'lousy',
  'lump-sniffer',
  'lunkhead',
  'malarkey',
  'miser',
  'moist-crumpet',
  'monday-to-friday',
  'moose-berries',
  'moron',
  'mother-fathers',
  'mother-frigger',
  'mother-of-pearl',
  'mother-trucker',
  'mothersmucker',
  'mouth-breather',
  'muck-thumper',
  'muckspout',
  'mudbutt',
  'mudskipper',
  'mule',
  'muppet',
  'my-word',
  'nads',
  'nards',
  'nerd',
  'nibblits',
  'night-soil',
  'nimrod',
  'nincompoop',
  'ninny',
  'ninnyhammer',
  'nitwit',
  'no-good',
  'no-no',
  'oaf',
  'oddball',
  'oof',
  'oops',
  'oopsie',
  'oopsie-daisy',
  'pansy',
  'patootie',
  'peanut-butter-and-jelly',
  'peas-and-rice',
  'peepee',
  'peeter',
  'piddle',
  'pig',
  'pinhead',
  'plopper',
  'poo',
  'poop',
  'poop-piler',
  'poop-smiler',
  'poop-wagon',
  'pooper',
  'pooping',
  'poopington',
  'poopmonster',
  'poopoo',
  'poopoo-balls',
  'poopoo-face',
  'poopoo-head',
  'poopsie',
  'poopsie-daisy',
  'poopy',
  'poopy-mcdoodooface',
  'poot',
  'poot-scrambler',
  'poot-wincer',
  'pootie',
  'poppycock',
  'potty',
  'potty-mouth',
  'prat',
  'privy',
  'puke',
  'puny',
  'putz',
  'rascal',
  'rats',
  'razzle-frazzit',
  'rear-admiral',
  'rootin-tootin',
  'royal-turdship',
  'rump',
  'sam-hill',
  'saucy',
  'sazzafraz',
  'scat-scraping',
  'schlong',
  'schtup',
  'scobberlotcher',
  'scoundrel',
  'screwed',
  'scruffy',
  'scuddle-butt',
  'scum-tumbler',
  'scummy',
  'shaft',
  'sheesh',
  'shifting-sands',
  'shifty',
  'ships-and-sailors',
  'shmuck',
  'shoot',
  'shootdarn',
  'shortstack',
  'shrew',
  'shtick',
  'shucks',
  'shut-the-front-door',
  'shut-up',
  'simpleton',
  'skeezy',
  'skidmarks',
  'skunk',
  'sleasebag',
  'sleaseball',
  'slimy',
  'slob',
  'sloth',
  'smellfungus',
  'smelly',
  'snails',
  'snarf',
  'snot-nose',
  'snot-rocket',
  'snotty',
  'sodding',
  'son-of-a-biscuit',
  'son-of-a-gun',
  'splatterhouse',
  'squirt',
  'stinker',
  'stinky',
  'stool',
  'stool-pidgeon',
  'stupid',
  'sufferin-succotash',
  'tallywhacker',
  'tarnation',
  'tee-tee',
  'teetering-teapots',
  'throne-dumpling',
  'thunderation',
  'ticked-off',
  'tink-sprinkler',
  'tinkle',
  'tittering-tadpoles',
  'todger',
  'toe-fungus',
  'tom-foolery',
  'tool',
  'toot',
  'toot-eater',
  'toot-scooting',
  'toot-wizard',
  'tooter',
  'tootle',
  'toots',
  'trash-panda',
  'trump-nugget',
  'tuhkus',
  'turd',
  'turd-burglar',
  'turd-scrambler',
  'turd-smuggler',
  'turd-whisperer',
  'tushie',
  'twig-and-berries',
  'twisted-knickers',
  'twit',
  'ugly',
  'upchuck',
  'wafflestomp',
  'wang',
  'weenie',
  'weewee',
  'what-the-hay',
  'whippersnapper',
  'whoa-nelly',
  'whomp-dropper',
  'whoops',
  'whoopsie',
  'wicked',
  'wiener',
  'wienus',
  'willy',
  'wimp-pidgeon',
  'wind-breaker',
  'yak-smacker',
  'yankeedoodle',
  'zoinks',
  'zounds',
];

// Having a power of two means that zooming in will reuse some digits
// Sorting by length will get rid of the longer, more obscure terms
// goshdarnits = goshdarnits.sort( (a,b) => a.length - b.length ).slice(0, 512);
goshdarnits = goshdarnits.slice(0, 512);

var count = goshdarnits.length;



var precisionPerDarn = Math.log2(count);

function hashToString(hash, precision) {
	var digits = [];
	var s;

	while(precision > 0) {
		s = hash % count;
		digits.push(goshdarnits[s]);
		hash = Math.trunc(hash/count);
		precision -= precisionPerDarn;
	}

	return digits.join(' ');
}

var precisions = [];
for (var i$1 = precisionPerDarn; i$1 < 60; i$1+= precisionPerDarn) {
	precisions.push(i$1);
}

var regexp = new RegExp('([a-zA-Z]+)', 'g');

function stringToHash(str) {
// 	let matches = [];
	var match;
	var hash = 0;
	var precision = 0;
	var multiplier = 1;
	regexp.exec('');	// Work around repeated queries
	while ((match = regexp.exec(str)) !== null) {
		var position = goshdarnits.indexOf(match[1]);
		if (position === -1) {
			if (precision) {
				// Return whatever we have up to this point
				return {hash: hash, precision: precision};
			} else {
				return undefined;
			}
		}
		hash += position * multiplier;
		multiplier *= count;
		precision += precisionPerDarn;
// 		matches.push(match[1]);
	}
// 	console.log(matches, hash);
	return {hash: hash, precision: precision};
}




var goshdarnits$1 = Object.freeze({
  hashToString: hashToString,
  precisions: precisions,
  stringToHash: stringToHash
});

// Default map stuff, assumes that 'gdgg' and 'bases' are already defined


function initMap(gdgg, bases, site, strings) {

	// Do stuff on a leaflet map

	var map = new L.Map('map', {fadeAnimation: false});

	var osm = L.tileLayer('http://{s}.osm.maptiles.xyz/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		maxNativeZoom: 18,
		maxZoom: 19
	}).addTo(map);

	L.control.scale().addTo(map);

	map.fitWorld();

	// Init photon search
	var searchControl = new L.Control.Photon({
		placeholder: strings.geocoderPlaceholder,
		onSelected: L.Util.falseFn,
		feedbackEmail: null
	}).addTo(map);

	var precisionLimit = 45;
	var clickPolygon, popup, hoverPolygon, hashCenterCircle;
	var lastHash;
	var persistentHash;


	// Find precisions given the GDGG ones and the bases' ones.
	var validPrecisions = [];
	for (var i in bases.precisions) {
		var max = 0;
		for (var j in gdgg.hashPrecisions) {
			if (bases.precisions[i] > gdgg.hashPrecisions[j]) {
				max = Math.max(gdgg.hashPrecisions[j], max);
			}
		}
		if (max && validPrecisions.indexOf(max) === -1 && max <= precisionLimit) {
			validPrecisions.push(max);
		}
	}

	var precision = validPrecisions[0];

	// 	console.log(validPrecisions);

	map.on('zoomend', function(ev) {
		// Find the smallest precision that fits within the entire bounds
		var mapCenter = map.getCenter();
		var mapZoom = map.getZoom();
		precision = validPrecisions[0];
		for (var i in validPrecisions) {
			var p = validPrecisions[i];
			var hash = gdgg.latLngToReadableHash(mapCenter.lat, mapCenter.lng, p);
			var trig = gdgg.readableHashToArea(hash);
			var bounds = L.polygon(trig).getBounds();
			var boundsZoom = map.getBoundsZoom(bounds)
			if (boundsZoom <= mapZoom) {
				precision = validPrecisions[+i + 1] || p;
			}
		}
	});

	function highlightArea(lat, lng, pop, forcedPrecision) {

		if (typeof forcedPrecision === 'number') {
			precision = forcedPrecision;
		}

		var hash = gdgg.latLngToReadableHash(lat, lng, precision);

		var polygon = pop ? clickPolygon : hoverPolygon;

		if (pop || lastHash != hash) {

			var trig = gdgg.readableHashToArea(hash);

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

			var numericHash = gdgg.latLngToNumericHash(lat, lng, precision);
	// 			let newPrecision = validPrecisions[ validPrecisions.indexOf(precision) + 1 ] || precision;

			hashCenter = gdgg.numericHashToLatLng(numericHash, precision);

			hashCenterCircle = L.circleMarker(hashCenter, {radius: 3, fill: false, color: 'black', weight: 1}).addTo(map);

			if (pop) {
				var hashStr = persistentHash = bases.hashToString(numericHash, precision);

				var text = '<div>' + hashStr + '</div>'
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
		var str = window.location.hash.replace('#','');

		var hashAndPrecision = bases.stringToHash(decodeURI(str));

		if (hashAndPrecision) {
			var center = gdgg.numericHashToLatLng(hashAndPrecision.hash, hashAndPrecision.precision);

			precision = 0;
			for (var i$1 in validPrecisions) {
				if (validPrecisions[i$1] < hashAndPrecision.precision) {
					precision = Math.max(validPrecisions[i$1], precision);
				}
			}

			highlightArea(center.lat, center.lng, true, precision);
		}
	}

	searchControl.on('selected', function (ev){
// 		console.log(ev);

		if ('choice' in ev && 'properties' in ev.choice && 'extent' in ev.choice.properties) {
			var ex = ev.choice.properties.extent;
			ev.choice.properties.bounds = L.latLngBounds( [ ex[1], ex[0] ], [ ex[3], ex[2] ] );
		}

		if ('bounds' in ev.choice.properties) {
// 			console.log('feature bounds',ev.choice.properties.bounds);

			var center = ev.choice.properties.bounds.getCenter();

			if ('precision' in ev.choice.properties) {
				var precision = 0;
				for (var i in validPrecisions) {
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

initMap(oqtm, goshdarnits$1, 'what3goshdarnits', {
	geocoderPlaceholder: 'Enter doggone place name here'
} );
