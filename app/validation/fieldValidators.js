import without from 'lodash/without'
import {
  email, minLength, mustMatch, required,
} from './rules'
import { validator } from './validator'

const validators = [
  { name: 'name', validator: validator('name', 'Name', required, minLength(2)) },
  { name: 'email', validator: validator('email', 'Email', required, email) },
  { name: 'password', validator: validator('password', 'Password', minLength(8)) },
  { name: 'confirm', validator: validator('confirm', 'Confirm', mustMatch('password', 'New Password')) },
]

export function fieldNamesWithout(fields = []) {
  return without(validators.reduce((prev, field) => [...prev, field.name], []), ...fields)
}

export default function fieldValidators(fields) {
  return validators.filter(field => fields.indexOf(field.name) > -1).reduce((prev, field) => [...prev, field.validator], [])
}

