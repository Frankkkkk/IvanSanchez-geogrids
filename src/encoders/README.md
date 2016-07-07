This directory holds different pluggable models for number-to-string encoders/decoders


For the purposes of this software, an encoder is a module that exports the following methods:
- hashToString(hash: Number, precision): String
- stringToHash(str: String): Number

And the following static property:
- precisions: [Number]

The `precisions` property holds the precisions, in number of bits of information, that a
encoder can encode/decode in an idempotent fashion. At this stage of development,
this software assumes that all encoders offer the same range of precisions for all
numbers.

The methods convert between a numeric GDGG id/hash to a string, and vice versa. String-to-number conversion can be expected to be fuzzy (ignoring uppercase/lowercase, etc), but converting to a string and back shall be always idempotent.

