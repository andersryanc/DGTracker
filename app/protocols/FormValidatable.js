import isEmpty from 'lodash/isEmpty'
import update from 'immutability-helper'
import { Component } from 'react'
import { validate } from '../validation/validator'

export default class FormValidatable extends Component {
  constructor(props, fieldValidations) {
    super(props)

    this.fieldValidations = fieldValidations

    const initialState = {
      showErrors: false,
      submitted: false,
      isLoading: false,
      validationErrors: {},
      formdata: {},
      networkError: null,
    }

    // Run validations on initial state
    initialState.validationErrors = validate({}, this.fieldValidations)

    this.state = initialState
  }

  onSubmit(evt) {
    if (evt) evt.preventDefault()

    this.setState({ showErrors: true, submitted: true })

    if (isEmpty(this.state.validationErrors) === false) return false

    // override this method in the sub-class and check the response of this for true
    // then we can customize each sub-class to have it's own POST logic
    return true
  }

  didChange(field) {
    return (value) => {
      let newValue = value

      let { formdata } = this.state

      let newData = update(formdata, {
        [field]: { $set: newValue }
      })
      const validationErrors = validate(newData, this.fieldValidations)
      this.setState({ validationErrors, formdata: newData })
    }
  }

  errorFor(field) {
    return !isEmpty(this.state.validationErrors[field]) ? this.state.validationErrors[field] : false
  }
}
