'use strict'

const buildOperatorValue = (filter) => {
  let operator = filter.operator
  let value = filter.value
  let result = {}

  if (isDate(value)) {
    value = new Date(value)
  }

  if (operator !== null) {
    result[operator] = value
  } else {
    result = value
  }

  return result
}

function isDate (value) {
  return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/gi.test(value)
}

module.exports.build = (filters) => {
  return filters.reduce((acc, filter) => {
    acc[filter.property] = buildOperatorValue(filter)

    return acc
  }, {})
}
