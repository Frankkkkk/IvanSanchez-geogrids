// Decide which algorithms to use
import * as gdgg from './gdgg/oqtm.js';
import * as bases from './bases/fucks.js';

// And tell the map stuff to actually use them
import initMap from './defaultmap.js';
initMap(gdgg, bases, 'what3fucks', 'alpha');
