import buildMatchPatternFn from '../../../_lib/buildMatchPatternFn/index.js'
import buildMatchFn from '../../../_lib/buildMatchFn/index.js'

var matchOrdinalNumberPattern = /^(\d+)(ος|η|ο|ου|ων)?/i
var parseOrdinalNumberPattern = /\d+/i

var matchEraPatterns = {
  narrow: /^(πΧ|μΧ)/i,
  abbreviated: /^(π\.?\s?χ\.?|π\.?\s?κ\.?\s?χ\.?|μ\.?\s?χ\.?|κ\.?\s?χ\.?)/i,
  wide: /^(προ Χριστο(ύ|υ)|πριν απ(ό|ο) την Κοιν(ή|η) Χρονολογ(ί|ι)α|μετ(ά|α) Χριστ(ό|ο)ν|Κοιν(ή|η) Χρονολογ(ί|ι)α)/i
}
var parseEraPatterns = {
  any: [/^πΧ/i, /^μΧ/i],
  abbreviated: /^(π\.?\s?Χ\.?|μ\.?\s?Χ\.?)/i,
  wide: [/^(προ Χριστο(ύ|υ))/i, /^(μετ(ά|α) Χριστ(ό|ο)ν)/i]
}

var matchQuarterPatterns = {
  narrow: /^[αβγδ]'/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](ο)? τρ(ί|ι)μηνο/i
}
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
}

var matchMonthPatterns = {
  narrow: /^[ιφμαμιιασονδ]/i,
  abbreviated: /^(ιαν|φεβ|μαρ|απρ|μαι|ιουν|ιουλ|αυγ|σεπ|οκτ|νοε|δεκ)/i,
  wide: /^(ιανου(ά|α)ριος|φεβρου(ά|α)ριος|μ(ά|α)ρτιος|απρ(ί|ί)λιος|μ(ά|α)ιος|ιο(ύ|υ)νιος|ιο(ύ|υ)λιος|α(ύ|υ)γουστος|σεπτ(έ|ε)μβριος|οκτ(ώ|ω)βριος|νο(έ|ε)μβριος|δεκ(έ|ε)μβριος)/i
}
var parseMonthPatterns = {
  narrow: [
    /^ι/i,
    /^φ/i,
    /^μ/i,
    /^α/i,
    /^μ/i,
    /^ι/i,
    /^ι/i,
    /^α/i,
    /^σ/i,
    /^ο/i,
    /^ν/i,
    /^δ/i
  ],
  any: [
    /^(ια|γε)/i,
    /^φ/i,
    /^μαρ/i,
    /^απ/i,
    /^μ[αά][ΐιη]/i,
    /^ιο[ύυ]ν/i,
    /^ιο[υύ]λ/i,
    /^α[ύυ]/i,
    /^σ/i,
    /^ο/i,
    /^ν/i,
    /^δ/i
  ]
}

var matchDayPatterns = {
  narrow: /^[κδτπ]/i,
  short: /^(κυ|δε|τρ|τε|π(έ|ε)|πα|σ(ά|α))/i,
  abbreviated: /^(κυρ|δευ|τρ(ί|ι)|τετ|π(έ|ε)μ|παρ|σ(ά|α)β)/i,
  wide: /^(κυριακ(ή|η)|δευτ(έ|ε)ρα|τρ(ί|ι)τη|τετ(ά|α)ρτη|π(έ|ε)μπτη|παρασκευ(ή|η)|σ(ά|α)ββατο)/i
}
var parseDayPatterns = {
  narrow: [/^κ/i, /^δ/i, /^τ/i, /^τ/i, /^π/i, /^π/i, /^σ/i],
  any: [/^κ/i, /^δ/i, /^τρ/i, /^τε/i, /^πε/i, /^πα/i, /^σ/i]
}

var matchDayPeriodPatterns = {
  narrow: /^(π|μ|μεσ(ά|α)νυχτα|μεσημ(έ|ε)ρι|(το|τη|στο|στη) (πρω(ί|ι)|απόγευμα|βρ(ά|α)δυ|ν(ύ|υ)χτα))/i,
  any: /^([πμ]\.?\s?μ\.?|μεσ(ά|α)νυχτα|μεσημ(έ|ε)ρι|(το|τη|στο|στη) (πρω(ί|ι)|απ(ό|ο)γευμα|βρ(ά|α)δυ|ν(ύ|υ)χτα))/i
}
var parseDayPeriodPatterns = {
  any: {
    am: /^π/i,
    pm: /^μ/i,
    midnight: /μεσ(ά|α)ν/i,
    noon: /^μεσημ(έ|ε)/i,
    morning: /πρω(ί|ι)/i,
    afternoon: /απ(ό|ο)γευμα/i,
    evening: /βρ(ά|α)δυ/i,
    night: /ν(ύ|υ)χτα/i
  }
}

var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function(value) {
      return parseInt(value, 10)
    }
  }),

  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),

  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function(index) {
      return index + 1
    }
  }),

  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),

  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),

  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
}

export default match
