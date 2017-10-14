export const validator = (field, name, ...validations) => {
  return (state) => {
    for (let v  of validations) {
      let errorMessageFunc = v(state[field], state)
      if (errorMessageFunc === 'STOP') {
        break
      }

      if (errorMessageFunc) {
        return {[field]: errorMessageFunc(name)}
      }
    }
    return null
  };
}

export const validate = (state, validators) => {
  return validators.reduce((memo, validator) => {
    return Object.assign(memo, validator(state))
  }, {})
}
