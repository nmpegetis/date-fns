import buildMatchPatternFn from '../../../_lib/buildMatchPatternFn/index.js'
import buildMatchFn from '../../../_lib/buildMatchFn/index.js'

var matchOrdinalNumberPattern = /^(\d+)(ος|η|ο|ου|ων)?/i
var parseOrdinalNumberPattern = /\d+/i

var matchEraPatterns = {
  narrow: /^(πΧ|μΧ)/i,
  abbreviated: /^(π\.?\s?Χ\.?|μ\.?\s?Χ\.?)/i,
  wide: /^(προ Χριστού|μετά Χριστόν)/i
}
var parseEraPatterns = {
  any: [/^πΧ/i, /^μΧ/i],
  abbreviated: /^(π\.?\s?Χ\.?|μ\.?\s?Χ\.?)/i,
  wide: [/^(προ Χριστού)/i, /^(μετά Χριστόν)/i]
}

var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](ο|ο|ο|ο)? τρίμηνο/i,
  wide: /^(α'|β'|γ'|δ')? τρίμηνο/i
}
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
}

var matchMonthPatterns = {
  narrow: /^[ιφμαμιιασονδ]/i,
  abbreviated: /^(Γεν|Φεβ|Μαρ|Απρ|Μαΐου|Ιούν|Ιούλ|Αυγ|Σεπ|Οκτ|Νοε|Δεκ)/i,
  wide: /^(Ιανουαρίου|Φεβρουαρίου|Μαρτίου|Απριλίου|Μαΐου|Ιουνίου|Ιουλίου|Αυγούστου|Σεπτεμβρίου|Οκτωβρίου|Νοεμβρίου|Δεκεμβρίου)/i
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
  narrow: /^[κδττππσ]/i,
  short: /^(κυ|δε|τρ|τε|πε|πα|σα)/i,
  abbreviated: /^(κυρ|δευ|τρι|τετ|πεμ|παρ|σαβ)/i,
  wide: /^(κυριακή|δευτέρα|τρίτη|τετάρτη|πέμπτη|παρασκευή|σά(β|ββ)ατο)/i
}
var parseDayPatterns = {
  narrow: [/^κ/i, /^δ/i, /^τ/i, /^τ/i, /^π/i, /^π/i, /^σ/i],
  any: [/^κ/i, /^δ/i, /^τρ/i, /^τε/i, /^πε/i, /^πα/i, /^σ/i]
}

var matchDayPeriodPatterns = {
  narrow: /^(π|μ|μεσάνυχτα|μεσημέρι|(το|τη|στο|στη) (πρωί|απόγευμα|βράδυ|νύχτα))/i,
  any: /^([πμ]\.?\s?μ\.?|τα μεσάνυχτα|το μεσημέρι|(το|τη|στο|στη) (πρωί|απόγευμα|βράδυ|νύχτα))/i
}
var parseDayPeriodPatterns = {
  any: {
    am: /^π/i,
    pm: /^μ/i,
    midnight: /μεσάνυχτα/i,
    noon: /μεσημέρι/i,
    morning: /πρωί/i,
    afternoon: /απόγευμα/i,
    evening: /βράδυ/i,
    night: /νύχτα/i
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
    defaultMatchWidth: 'abbreviated',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'abbreviated'
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
