This directory holds different pluggable models for Global Discrete Geodetic Grids (GDGGs).


For the purposes of this software, a GDGG is a module that exports the following methods:

- latLngToReadableHash(lat: Number, lng: Number, precision: Number)
- latLngToNumericHash(lat: Number, lng: Number, precision: Number, radix: Number)
- readableHashToLatLng(hash: String)
- numericHashToLatLng(hash: Number, radix: Number)
- readableHashToArea(hash: Number)
- numericHashToArea(hash: Number, radix: Number)
