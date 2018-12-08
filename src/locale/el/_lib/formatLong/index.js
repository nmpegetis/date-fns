import buildFormatLongFn from '../../../_lib/buildFormatLongFn/index.js'

var dateFormats = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  short: 'dd/MM/yyyy'
}

var timeFormats = {
  full: 'hh:mm:ss zzzz',
  long: 'hh:mm:ss z',
  medium: 'hh:mm:ss a',
  short: 'hh:mm a'
}

var dateTimeFormats = {
  full:
    '{{time}}' === '1' || '{{time}}' === '13'
      ? "{{date}} 'στη' {{time}}"
      : "{{date}} 'στις' {{time}}",
  long:
    '{{time}}' === '1' || '{{time}}' === '13'
      ? "{{date}} 'στη' {{time}}"
      : "{{date}} 'στις' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
}

var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: 'full'
  }),

  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: 'full'
  }),

  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
}

export default formatLong
