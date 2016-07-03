



var consonants = ['', 'j','k','l'/*,'m','n'*/,'p','s','t','w'];
var leadingNasals = ['', ' ', 'm','n','m ','n '];
var finalNasals = ['', 'm','n'];
var vowels = ['a','e','i','o','u'];

var leadingSyllabes = [];
var finalSyllabes = [];
var i, j, k;

for (i in consonants) {
	for (j in vowels) {
		for (k in leadingNasals) {
			leadingSyllabes.push( consonants[i] + vowels[j] + leadingNasals[k]);
		}
		for (k in finalNasals) {
			finalSyllabes.push( consonants[i] + vowels[j] + finalNasals[k]);
		}
	}
}

var leadingCount = leadingSyllabes.length;
var finalCount = finalSyllabes.length;

var precisionPerLeading = Math.log2(leadingCount);
var precisionPerFinal = Math.log2(finalCount);


// 'precision' is the desired precision, in number of bits
function hashToString(hash, precision) {
// 	var digits = [];
	var str = '';
	var s;
// console.log(precision, precisionPerFinal, precisionPerLeading);

// 	while(precision > precisionPerFinal) {
	while(precision > precisionPerLeading) {
		s = hash % leadingCount;
// 			digits.push(s);
		str += leadingSyllabes[s];
		hash = Math.trunc(hash/leadingCount);
		precision -= precisionPerLeading;
	}
	s = hash % finalCount;
// 		digits.push(s);
	str += finalSyllabes[s];
	hash = Math.trunc(hash/finalCount);
	precision -= precisionPerFinal;
// 	}
	
// console.log('Unused precision: ', precision);
	
	return str;
}


var precisions = [];
for (var i = precisionPerFinal; i < 60; i+= precisionPerLeading) {
	precisions.push(i);
}


// console.log(base);
// console.log(precisions);

if (!window) {
	module.exports = {
		precisions: precisions,
		hashToString: hashToString,
// 		stringToHash: stringToHash
	}
}
