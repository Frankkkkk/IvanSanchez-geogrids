'use strict';

let cheeses = [
'Abertam',
'Abondance',
'Ädelost',
'Aghoughlou',
'Aisy',
'Ambrosia',
'Amou',
'Angelot',
'Annot',
'Aoules',
'Appenzeller',
'Ardrahan',
'Arpitan',
'Arrigny',
'Arthon',
'Asiago',
'Aura',
'Autun',
'Avalin',
'Bagòss',
'Banon',
'Barbeillon',
'beaufort',
'Belloc',
'Bergues',
'Bessay',
'Bethmale',
'Bitto',
'Bleuchâtel',
'Bocconcini',
'Bondard',
'Boucantrin',
'Brézain',
'Brie',
'Brocciu',
'Brunost',
'Bundz',
'Burrata',
'Butterkäse',
'Cabécou',
'Cachaille',
'Caerphilly',
'Caillebotte',
'Calinzanincu',
'Camembert',
'Cantal',
'Carré',
'Castelmagno',
'Cathare',
'Cebreiro',
'Cedenol',
'Ceshire',
'Chaource',
'Chevrotin',
'Chhurpi',
'Citeaux',
'Claquebitou',
'Clochette',
'Colombier',
'Comté',
'Coquetdale',
'Cottenham',
'Coulommiers',
'Crayeux',
'Croglin',
'Danablu',
'Dauphin',
'Délice',
'Derby',
'Dolcelatte',
'Dovedale',
'Dubliner',
'Dunlop',
'Duprado',
'Durrus',
'Échourgnac',
'Edam',
'Emmental',
'Époisses',
'Esbareich',
'Etivaz',
'Excelsior',
'Faisselle',
'Feta',
'Figou',
'Floreffe',
'Fontainebleau',
'Fourme',
'Fricâlin',
'Gammelost',
'Gaperon',
'Gaztanbera',
'Ġbejna',
'Gien',
'Golka',
'Gorgonzola',
'Gourmelin',
'Graçay',
'Grevé',
'Gruyère',
'Halloumi',
'Havarti',
'Huntsman',
'Hushållsost',
'Ibakhbakhane',
'Idiazábal',
'Irkotta',
'Jarlsberg',
'Jonchée',
'Jura',
'Kasséri',
'Kazemat',
'Kechek',
'Kefalotýri',
'Kénogami',
'Korbáčik',
'Laguiole',
'Langres',
'Lavort',
'Lebné',
'Leerdammer',
'Leipäjuusto',
'Lévéjac',
'Liptauer',
'livarot',
'Llenguat',
'Lormes',
'Maasdam',
'Mâconnais',
'Magor',
'Malakoff',
'Mamirolle',
'Manchego',
'Maó',
'Maquée',
'Maroilles',
'Mascarpone',
'Massipou',
'Mató',
'Meilleraye',
'Ménez-Hom',
'Metton',
'Mimolette',
'Miromando',
'Mizithra',
'Mizotte',
'Montasio',
'Mont-d’Or',
'Morbier',
'Mothais',
'Mottin',
'Mozzarella',
'Munster',
'Murazzano',
'Murol',
'Năsal',
'Meufchâtel',
'Niolo',
'Nisa',
'Numidia',
'Obatzda',
'Oelenberg',
'Oka',
'Mlivet',
'Orval',
'Oscypek',
'Ovalie',
'Palet',
'Panir',
'Parenica',
'Parmesan',
'Passendale',
'Pavé',
'Pavin',
'Pecorino',
'Pélardon',
'Penteleu',
'Pérail',
'Persillé',
'Pétafine',
'Picodon',
'Pikauba',
'Pithiviers',
'Plaisentif',
'Provolone',
'Pultost',
'Pyrénées',
'Rabaçal',
'Raclette',
'Ragusano',
'Ramequin',
'Raschera',
'Rebarbe',
'Reblochon',
'Recuite',
'Remoudou',
'Requeijão',
'Ricotta',
'Rigotte',
'Rocamadour',
'Rochebaron',
'Rocroi',
'Rogallais',
'Rogeret',
'Rollot',
'Roquefort',
'Rovethym',
'Royalp',
'Saingorlon',
'Salers',
'Santarém',
'Sarasson',
'Sarteno',
'Savaron',
'Sbrinz',
'Scamorza',
'Sérac',
'Silter',
'Sirene',
'Soumaintrain',
'Stichelton',
'Stilton',
'Stracchino',
'Șvaițer',
'Swaledale',
'Takemarit',
'Taleggio',
'Tamié',
'Tarag',
'Taupinette',
'Telemea',
'Thollon',
'Tignard',
'Tilsit',
'Tintern',
'Tomar',
'Tomme',
'Tracle',
'Trappiste',
'Trecce',
'Tricorne',
'Tuma',
'Tybo',
'Urdă',
'Urt',
'Vacherin',
'Valbert',
'valençay',
'Venaco',
'Vézelay',
'Vignotte',
'Villebarou',
'Void',
'Voves',
'Waterloo',
'Yarg'
	];

// Having a power of two means that zooming in will reuse some digits
// Sorting by length will get rid of the longer, more obscure terms
// fucks = fucks.sort( (a,b) => a.length - b.length ).slice(0, 512);
cheeses = cheeses.slice(0, 256);

var count = cheeses.length;

var precisionPerCheese = Math.log2(count);

export function hashToString(hash, precision) {
	var digits = [];
	var s;

	while(precision > 0) {
		s = hash % count;
		digits.push(cheeses[s]);
		hash = Math.trunc(hash/count);
		precision -= precisionPerCheese;
	}

	return digits.join(' ');
}

export var precisions = [];
for (var i = precisionPerCheese; i < 60; i+= precisionPerCheese) {
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
		let position = cheeses.indexOf(match[1]);
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
		precision += precisionPerCheese;
// 		matches.push(match[1]);
	}
// 	console.log(matches, hash);
	return {hash: hash, precision: precision};
}


