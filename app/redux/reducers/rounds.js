
export const LOADED = 'rounds/LOADED'
export const UPDATE = 'rounds/UPDATE'
export const RESET = 'rounds/RESET'

const initialState = {
  isLoaded: false,
  data: [],
}

const rounds = (state = initialState, action) => {
  switch (action.type) {
    case LOADED:
      return {
        ...state,
        isLoaded: true,
      }
    case UPDATE:
      return {
        ...state,
        isLoaded: true,
        data: [
          ...action.rounds
        ]
      }
    case RESET:
      return {
        ...state,
        isLoaded: false,
        data: [],
      }
    default:
      return state
  }
}

export default rounds
