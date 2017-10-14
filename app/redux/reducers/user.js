export const LOADED = 'user/LOADED'
export const LOGIN = 'user/LOGIN'
export const LOGOUT = 'user/LOGOUT'
export const CREATE_FAILED = 'user/CREATE_FAILED'
export const UPDATE = 'user/UPDATE'

const initialState = {
  isAuthenticated: false,
  isLoaded: false,
  data: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOADED:
      return {
        ...state,
        isLoaded: true,
      }
    case LOGIN:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.user
        },
        isLoaded: true,
        isAuthenticated: true,
      }
    case LOGOUT:
      return {
        ...state,
        data: null,
        isLoaded: true,
        isAuthenticated: false,
      }
    case CREATE_FAILED:
      return {
        ...state,
        error: action.error,
      }
    case UPDATE:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.user
        }
      }
    default:
      return state
  }
}

export default user
