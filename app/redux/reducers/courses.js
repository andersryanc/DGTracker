
export const LOADED = 'courses/LOADED'
export const UPDATE = 'courses/UPDATE'

const initialState = {
  isLoaded: false,
  data: [],
}

const courses = (state = initialState, action) => {
  switch (action.type) {
    case LOADED:
      return {
        ...state,
        isLoaded: true,
      }
    case UPDATE:
      return {
        ...state,
        data: [
          ...action.courses
        ]
      }
    default:
      return state
  }
}

export default courses
