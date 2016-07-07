This directory holds different pluggable models for Global Discrete Geodetic Grids (GDGGs).


For the purposes of this software, a GDGG is a module that exports the following methods:

- latLngToReadableHash(lat: Number, lng: Number, precision: Number): String
- latLngToNumericHash(lat: Number, lng: Number, precision: Number, radix: Number): Number
- readableHashToLatLng(hash: String): {lat, lng}
- numericHashToLatLng(hash: Number): {lat, lng}
- readableHashToArea(hash: Number): [{lat, lng}]
- numericHashToArea(hash: Number): [{lat, lng}]

And the following static property:
- hashPrecisions: [Number]

The methods convert between a plain object with `lat` and `lng` properties, a number, a string, and back. e.g.:

```
// Get the hashes for a given lat-lng
var str = latLngToReadableHash({ lat: 10, lng: -50 });
var nbr = latLntToNumericHash({ lat: 10, lng: -50 });

// Get the area covered by that hash, as a triangle/square/hexagon/whatever
// represented by {lat:…, lng:…} objects for each of its corners
var area = numericHashToArea(nbr);
```

The `hashPrecisions` property contains the precisions, in number of bits of information,
that this GDGG is able to offer. At this stage of development, this software assumes
that all GDGGs offer the same range of precisions for all points on the geoid.
