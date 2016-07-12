// Load everything

import * as oqtm from './gdgg/oqtm.js';
import * as fucks from './encoders/fucks.js';
import * as pokes from './encoders/pokes.js';
import * as ikea  from './encoders/ikea.js';
import * as tokiPonaSyllabes from './encoders/toki-pona-syllabes.js';
import * as cheeses from './encoders/cheeses.js';


// Expose everything

export var encoders = {
	fucks: fucks,
	pokes: pokes,
	ikea: ikea,
	tokiPonaSyllabes: tokiPonaSyllabes,
	cheeses: cheeses
}

export var gdgg = {
	oqtm: oqtm
}
