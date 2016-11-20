'use strict'

/**
 * Check if the given string is an boolean
 *
 * @param {String} string
 * @returns {Boolean}
 */
const isBoolean = (string) => {
  return (string === 'false') || (string === 'true')
}

/**
 * Extract the operator
 *
 * @param {String} value
 * @returns
 */
const getOperator = (value) => {
  let operators = /^(>=|<=|>|<).+$/gmi.exec(value)
  if (operators && operators.length) {
    return operators[1]
  }

  return null
}
const getMongoOperator = (operator) => {
  switch (operator) {
    case '>':
      return '$gt'
    case '>=':
      return '$gte'
    case '=':
      return '$eq'
    case '<':
      return '$lt'
    case '<=':
      return '$lte'
    default:
      return null
  }
}

const extractKeyValue = (pair) => {
  let pairs = pair.split('::')
  let extracted = pairs.reduce((prev, curr, index) => {
    if (index % 2 === 0) {
      prev.property = curr
    } else {
      let operator = getOperator(curr)
      prev.operator = getMongoOperator(operator)
      let value = curr.replace(operator, '')
      if (isBoolean(value)) {
        prev.value = value === 'true'
      } else {
        prev.value = value
      }
    }
    return prev
  }, {})

  return extracted
}

/**
 * Extract filter values
 *
 * @param {String} filters
 * @returns {Object}
 */
const extractFilter = (filters) => {
  if (!filters) return null
  let result = filters.split('|')
    .reduce((prev, curr, index) => {
      let pair = extractKeyValue(curr)
      prev.push(pair)

      return prev
    }, [])

  return result
}

exports.extract = extractFilter
