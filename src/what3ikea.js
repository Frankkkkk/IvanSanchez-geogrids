// Decide which algorithms to use
import * as oqtm from './gdgg/oqtm.js';
import * as ikea from './encoders/ikea.js';

// And tell the map stuff to actually use them
import initMap from './defaultmap.js';
initMap(oqtm, ikea, 'what3ikea', {
	geocoderPlaceholder: 'Enter designer-inspired name here'
} );
