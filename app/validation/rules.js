import * as ErrorMessages from './errorMessages.js'
// import moment from 'moment'

export const required = (text) => {
  if (text) {
    return null
  } else {
    return ErrorMessages.isRequired
  }
}

export const requiredWith = (field, fieldName) => {
  return (text, state) => {
    if (!state[field]) return 'STOP'
    return state[field] && text ? null : ErrorMessages.isRequired
  }
}

export const mustMatch = (field, fieldName) => {
  return (text, state) => {
    return state[field] === text ? null : ErrorMessages.mustMatch(fieldName)
  }
}

export const minLength = (length) => {
  return (text) => {
    return text && text.length >= length ? null : ErrorMessages.minLength(length)
  }
}

export const maxLength = (length) => {
  return (text) => {
    return text && text.length <= length ? null : ErrorMessages.maxLength(length)
  }
}

export const exactLength = (length) => {
  return (text) => {
    return text && text.length === length ? null : ErrorMessages.exactLength(length)
  }
}

export const email = (text) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text) ? null : ErrorMessages.isEmail
}

export const phone = (text) => {
  return /^\(?[0-9]{3}\)?\s?-?\s?[0-9]{3}\s?-?\s?[0-9]{4}$/i.test(text) ? null : ErrorMessages.isPhone
}

export const digits = (text) => {
  return /^[0-9]+$/i.test(text) ? null : ErrorMessages.isDigits
}

export const ssn = (text) => {
  return /^[0-9]{3}\s?-?\s?[0-9]{2}\s?-?\s?[0-9]{4}$/i.test(text) ? null : ErrorMessages.isSSN
}

// export const date = (text) => {
//   return /^[0-9]{2}\s?\/\s?[0-9]{2}\s?\/\s?[0-9]{4}$/i.test(text) ?
//     moment(text, 'MM/DD/YYYY').isValid() ? null : ErrorMessages.isDate
//     : ErrorMessages.isDate
// }

// export const ofAge = (text) => {
//   return moment(text, 'MM/DD/YYYY').isBefore(moment().subtract(18, 'y')) ? null : ErrorMessages.isOfAge
// }

export const routingNumber = (routingNumber) => {
  var c, i, n, t

  // First, remove any non-numeric characters.
  t = ''
  for (i = 0; i < routingNumber.length; i++) {
    c = parseInt(routingNumber.charAt(i), 10)
    if (c >= 0 && c <= 9) {
      t += c
    }
  }

  // Check the length, it should be nine digits.
  if (t.length !== 9) {
    return ErrorMessages.isRoutingNumber
  }

  // Now run through each digit and calculate the total.
  n = 0
  for (i = 0; i < t.length; i += 3) {
    n += parseInt(t.charAt(i + 0), 10) * 3
    n += parseInt(t.charAt(i + 1), 10) * 7
    n += parseInt(t.charAt(i + 2), 10) * 1
  }

  // If the resulting sum is an even multiple of ten (but not zero),
  // the aba routing number is good.
  if (n !== 0 && n % 10 === 0) {
    return null
  }

  return ErrorMessages.isRoutingNumber
}
