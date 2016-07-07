// Load everything

import * as oqtm from './gdgg/oqtm.js';
import * as fucks from './encoders/fucks.js';
import * as tokiPonaSyllabes from './encoders/toki-pona-syllabes.js';


// Expose everything

export var encoders = {
	fucks: fucks,
	tokiPonaSyllabes: tokiPonaSyllabes
}

export var gdgg = {
	oqtm: oqtm
}
