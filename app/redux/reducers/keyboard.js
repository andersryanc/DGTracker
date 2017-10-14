export const UPDATE = 'keyboard/UPDATE'

const initialState = {
  isVisible: false,
}

const keyboard = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

export default keyboard
