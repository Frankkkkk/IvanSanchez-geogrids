// Decide which algorithms to use
import * as oqtm from './gdgg/oqtm.js';
import * as pokes from './encoders/pokes.js';

// And tell the map stuff to actually use them
import initMap from './defaultmap.js';
initMap(oqtm, pokes, 'what3pokemon', {
	geocoderPlaceholder: 'Enter place name here'
} );
