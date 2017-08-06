// Decide which algorithms to use
import * as oqtm from './gdgg/oqtm.js';
import * as goshdarnits from './encoders/goshdarnits.js';

// And tell the map stuff to actually use them
import initMap from './defaultmap.js';
initMap(oqtm, goshdarnits, 'what3goshdarnits', {
	geocoderPlaceholder: 'Enter doggone place name here'
} );
