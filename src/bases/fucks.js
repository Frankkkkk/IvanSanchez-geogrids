var profanities = [
	'anus',
	'arse',
	'arsehole',
	'ass',
	'ass-hat',
	'ass-jabber',
	'ass-pirate',
	'assbag',
	'assbandit',
	'assbanger',
	'assbite',
	'assclown',
	'asscock',
	'asscracker',
	'asses',
	'assface',
	'assfuck',
	'assfucker',
	'assgoblin',
	'asshat',
	'asshead',
	'asshole',
	'asshopper',
	'assjacker',
	'asslick',
	'asslicker',
	'assmonkey',
	'assmunch',
	'assmuncher',
	'assnigger',
	'asspirate',
	'assshit',
	'assshole',
	'asssucker',
	'asswad',
	'asswipe',
	'bampot',
	'bastard',
	'beaner',
	'bitch',
	'bitchass',
	'bitchtits',
	'blowjob',
	'bollocks',
	'boner',
	'brotherfucker',
	'bullshit',
	'bumblefuck',
	'buttplug',
	'buttfucker',
	'cameltoe',
	'cancer',
	'carpetmuncher',
	'chesticle',
	'chink',
	'chode',
	'clit',
	'clitface',
	'clitfuck',
	'clitoris',
	'clusterfuck',
	'cock',
	'cockass',
	'cockbite',
	'cockburger',
	'cockface',
	'cockfucker',
	'cockhead',
	'cockjockey',
	'cockknoker',
	'cockmaster',
	'cockmongler',
	'cockmongruel',
	'cockmonkey',
	'cockmuncher',
	'cocknose',
	'cocknugget',
	'cockshit',
	'cocksmith',
	'cocksmoker',
	'cocksniffer',
	'cocksucker',
	'cockwaffle',
	'coochie',
	'coon',
	'cooter',
	'cracker',
	'cum',
	'cumbubble',
	'cumdumpster',
	'cumguzzler',
	'cumjockey',
	'cumslut',
	'cumtart',
	'cunnie',
	'cunnilingus',
	'cunt',
	'cuntass',
	'cuntface',
	'cunthole',
	'cuntlicker',
	'cuntrag',
	'cuntslut',
	'dago',
	'damn',
	'deggo',
	'dick',
	'dick-sneeze',
	'dickbag',
	'dickbeaters',
	'dickface',
	'dickfucker',
	'dickhead',
	'dickhole',
	'dickjuice',
	'dickmilk',
	'dickmonger',
	'dickslap',
	'dicksucker',
	'dicksucking',
	'dicktickler',
	'dickwad',
	'dickweasel',
	'dickweed',
	'dickwod',
	'dildo',
	'dipshit',
	'doochbag',
	'dookie',
	'douche',
	'douche-fag',
	'douchebag',
	'douchewaffle',
	'dumbass',
	'dumbfuck',
	'dumbshit',
	'dyke',
	'eightball',
	'fag',
	'fagbag',
	'fagfucker',
	'faggot',
	'faggotcock',
	'fagtard',
	'fatass',
	'fellatio',
	'feltch',
	'flamer',
	'fuck',
	'fuckass',
	'fuckbag',
	'fuckboy',
	'fuckbrain',
	'fuckbutt',
	'fuckbutter',
	'fucker',
	'fuckersucker',
	'fuckface',
	'fuckhead',
	'fuckhole',
	'fucking',
	'fucknut',
	'fucknutt',
	'fuckoff',
	'fucks',
	'fuckstick',
	'fucktard',
	'fucktart',
	'fucktoy',
	'fuckup',
	'fuckwad',
	'fuckwitt',
	'fudgepacker',
	'gay',
	'gayass',
	'gaybob',
	'gaydo',
	'gayfuck',
	'gayfuckist',
	'gaylord',
	'gaytard',
	'gaywad',
	'god',
	'goddamn',
	'gooch',
	'gook',
	'gringo',
	'guido',
	'handjob',
	'hardon',
	'heeb',
	'hell',
	'ho',
	'homo',
	'homodumbshit',
	'honkey',
	'humping',
	'jackass',
	'jagoff',
	'jap',
	'jerkoff',
	'jerkass',
	'jigaboo',
	'jizz',
	'junglebunny',
	'kike',
	'kraut',
	'kyke',
	'lameass',
	'lardass',
	'lesbian',
	'lesbo',
	'lezzie',
	'mcfagget',
	'mick',
	'minge',
	'motherfucker',
	'muff',
	'muffdiver',
	'munging',
	'negro',
	'nigaboo',
	'nigga',
	'nigger',
	'niggers',
	'niglet',
	'nutsack',
	'paki',
	'panooch',
	'pecker',
	'peckerhead',
	'penis',
	'penisbanger',
	'penisfucker',
	'penispuffer',
	'piss',
	'pissoff',
	'pissflaps',
	'polesmoker',
	'pollock',
	'poon',
	'poonani',
	'poonany',
	'poontang',
	'porchmonkey',
	'prick',
	'punanny',
	'punta',
	'pussy',
	'pussylicker',
	'puto',
	'queef',
	'queer',
	'queerbait',
	'queerhole',
	'renob',
	'rimjob',
	'ruski',
	'sandnigger',
	'schlong',
	'scrote',
	'semen',
	'shit',
	'shitass',
	'shitbag',
	'shitbagger',
	'shitbrains',
	'shitbreath',
	'shitcanned',
	'shitcunt',
	'shitdick',
	'shitface',
	'shitfaced',
	'shithead',
	'shithole',
	'shithouse',
	'shitspitter',
	'shitstain',
	'shitter',
	'shittiest',
	'shitting',
	'shitty',
	'shiz',
	'shiznit',
	'skank',
	'skeet',
	'skullfuck',
	'slut',
	'slutbag',
	'smeg',
	'snatch',
	'spick',
	'splooge',
	'spook',
	'suckass',
	'tard',
	'testicle',
	'thundercunt',
	'tit',
	'titfuck',
	'twat',
	'twatlips',
	'twats',
	'twatwaffle',
	'unclefucker',
	'vagina',
	'wank',
	'wanker',
	'wankjob',
	'wetback',
	'whore',
	'whorebag',
	'whoreface',
	'wop'];

var drugs = [
	'acid',
	'african',
	'amphets',
	'angel',
	'angeldust',
	'badrock',
	'bagman',
	'bagging',
	'baked',
	'balling',
	'bamba',
	'banano',
	'beamer',
	'bedbugs',
	'bennies',
	'bickie',
	'bingers',
	'birdhead',
	'blackdust',
	'bluedevil',
];

words = profanities.concat(drugs);

// Having a power of two means that zooming in will reuse some digits
// words = words.slice(0, 256);
	
var count = words.length;

var precisionPerWord = Math.log2(count);

export function hashToString(hash, precision) {
	var digits = [];
	var s;

	while(precision > 0) {
		s = hash % count;
		digits.push(words[s]);
		hash = Math.trunc(hash/count);
		precision -= precisionPerWord;
	}
	
	return digits.join(' ');
}

export var precisions = [];
for (var i = precisionPerWord; i < 60; i+= precisionPerWord) {
	precisions.push(i);
}

export function stringToHash(str) {
	
}


