// Decide which algorithms to use
import * as oqtm from './gdgg/oqtm.js';
import * as fucks from './encoders/fucks.js';

// And tell the map stuff to actually use them
import initMap from './defaultmap.js';
initMap(oqtm, fucks, 'what3fucks', 'alpha');
