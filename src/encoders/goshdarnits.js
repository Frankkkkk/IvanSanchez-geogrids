'use strict';

let goshdarnits = [
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

export function hashToString(hash, precision) {
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

export var precisions = [];
for (var i = precisionPerDarn; i < 60; i+= precisionPerDarn) {
	precisions.push(i);
}

let regexp = new RegExp('([a-zA-Z]+)', 'g');

export function stringToHash(str) {
// 	let matches = [];
	let match;
	let hash = 0;
	let precision = 0;
	let multiplier = 1;
	regexp.exec('');	// Work around repeated queries
	while ((match = regexp.exec(str)) !== null) {
		let position = goshdarnits.indexOf(match[1]);
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


