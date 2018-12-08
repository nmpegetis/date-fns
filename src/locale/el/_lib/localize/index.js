import buildLocalizeFn from '../../../_lib/buildLocalizeFn/index.js'

var eraValues = {
  narrow: ['πΧ', 'μΧ'],
  abbreviated: ['π.Χ.', 'μ.Χ.'],
  wide: ['προ Χριστού', 'μετά Χριστόν']
}

var quarterValues = {
  narrow: ["α'", "β'", "γ'", "δ'"],
  abbreviated: ['Τ1', 'Τ2', 'Τ3', 'Τ4'],
  wide: ['1o τρίμηνο', '2o τρίμηνο', '3o τρίμηνο', '4º τρίμηνο']
}

var monthValues = {
  narrow: ['Ι', 'Φ', 'Μ', 'Α', 'Μ', 'Ι', 'Ι', 'Α', 'Σ', 'Ο', 'Ν', 'Δ'],
  abbreviated: [
    'Ιαν',
    'Φεβ',
    'Μαρ',
    'Απρ',
    'Μαϊ',
    'Ιουν',
    'Ιουλ',
    'Αυγ',
    'Σεπ',
    'Οκτ',
    'Νοε',
    'Δεκ'
  ],
  wide: [
    'Ιανουάριος',
    'Φεβρουάριος',
    'Μάρτιος',
    'Απρίλιος',
    'Μάιος',
    'Ιούνιος',
    'Ιούλιος',
    'Αύγουστος',
    'Σεπτέμβριος',
    'Οκτώβριος',
    'Νοέμβριος',
    'Δεκέμβριος'
  ]
}

var dayValues = {
  narrow: ['Κ', 'Δ', 'Τ', 'Τ', 'Π', 'Π', 'Σ'],
  short: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σα'],
  abbreviated: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],
  wide: [
    'Κυριακή',
    'Δευτέρα',
    'Τρίτη',
    'Τετάρτη',
    'Πέμπτη',
    'Παρασκευή',
    'Σάββατο'
  ]
}

var formattingMonthValues = {
  narrow: ['Ι', 'Φ', 'Μ', 'Α', 'Μ', 'Ι', 'Ι', 'Α', 'Σ', 'Ο', 'Ν', 'Δ'],
  abbreviated: [
    'Ιαν',
    'Φεβ',
    'Μαρ',
    'Απρ',
    'Μαϊ',
    'Ιουν',
    'Ιουλ',
    'Αυγ',
    'Σεπ',
    'Οκτ',
    'Νοε',
    'Δεκ'
  ],
  wide: [
    'Ιανουαρίου',
    'Φεβρουαρίου',
    'Μαρτίου',
    'Απριλίου',
    'Μαΐου',
    'Ιουνίου',
    'Ιουλίου',
    'Αυγούστου',
    'Σεπτεμβρίου',
    'Οκτωβρίου',
    'Νοεμβρίου',
    'Δεκεμβρίου'
  ]
}

var formattingDayPeriodValues = {
  narrow: {
    am: 'πμ',
    pm: 'μμ',
    midnight: 'μεσάνυχτα',
    noon: 'μεσημέρι',
    morning: 'το πρωί',
    afternoon: 'το απόγευμα',
    evening: 'το βράδυ',
    night: 'τη νύχτα'
  },
  abbreviated: {
    am: 'π.μ.',
    pm: 'μ.μ.',
    midnight: 'μεσάνυχτα',
    noon: 'μεσημέρι',
    morning: 'το πρωί',
    afternoon: 'το απόγευμα',
    evening: 'το βράδυ',
    night: 'τη νύχτα'
  },
  wide: {
    am: 'π.μ.',
    pm: 'μ.μ.',
    midnight: 'μεσάνυχτα',
    noon: 'μεσημέρι',
    morning: 'το πρωί',
    afternoon: 'το απόγευμα',
    evening: 'το βράδυ',
    night: 'τη νύχτα'
  }
}

var dayPeriodValues = {
  narrow: {
    am: 'πμ',
    pm: 'μμ',
    midnight: 'μεσάνυχτα',
    noon: 'μεσημέρι',
    morning: 'πρωί',
    afternoon: 'απόγευμα',
    evening: 'βράδυ',
    night: 'νύχτα'
  },
  abbreviated: {
    am: 'π.μ.',
    pm: 'μ.μ.',
    midnight: 'μεσάνυχτα',
    noon: 'μεσημέρι',
    morning: 'πρωί',
    afternoon: 'απόγευμα',
    evening: 'βράδυ',
    night: 'νύχτα'
  },
  wide: {
    am: 'π.μ.',
    pm: 'μ.μ.',
    midnight: 'μεσάνυχτα',
    noon: 'μεσημέρι',
    morning: 'πρωί',
    afternoon: 'απόγευμα',
    evening: 'βράδυ',
    night: 'νύχτα'
  }
}

function ordinalNumber(dirtyNumber, dirtyOptions) {
  var options = dirtyOptions || {}
  var unit = String(options.unit)
  var suffix

  if (unit === 'year' || unit === 'month') {
    suffix = 'ος'
  } else if (
    unit === 'week' ||
    unit === 'dayOfYear' ||
    unit === 'day' ||
    unit === 'hour' ||
    unit === 'date'
  ) {
    suffix = 'η'
  } else {
    suffix = 'ο'
  }

  return dirtyNumber + suffix
}

var localize = {
  ordinalNumber: ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function(quarter) {
      return Number(quarter) - 1
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: 'wide'
  }),

  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: 'wide'
  }),

  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaulFormattingWidth: 'wide'
  })
}

export default localize
