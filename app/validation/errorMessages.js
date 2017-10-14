export const isRequired = fieldName => `${fieldName} is required`

export const mustMatch = otherFieldName => {
  return (fieldName) => `${fieldName} must match ${otherFieldName}`
}

export const minLength = length => {
  return (fieldName) => `${fieldName} must be at least ${length} characters`
}

export const maxLength = length => {
  return (fieldName) => `${fieldName} must be less than ${length + 1} characters`
}

export const exactLength = length => {
  return (fieldName) => `${fieldName} must be exactly ${length} characters`
}

export const isDigits = fieldName => `${fieldName} must be only digits.`

export const isEmail = fieldName => `${fieldName} must be a valid email.`

export const isPhone = fieldName => `${fieldName} must be a valid phone number.`

export const isDate = fieldName => `${fieldName} must be a valid date.`

export const isOfAge = fieldName => `You must be at least 18 years old.`

export const isSSN = fieldName => `${fieldName} must be a valid social security number.`

export const isRoutingNumber = fieldName => `${fieldName} must be a valid bank routing number.`
