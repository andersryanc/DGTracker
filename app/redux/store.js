import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'

export default function configureStore() {
  if (module.hot) {
    const acceptCallback = () => {
      store.replaceReducer(require('./reducers').default)
    }
    module.hot.accept('./reducers', acceptCallback)
    module.hot.acceptCallback = acceptCallback
  }

  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
  )
  return store
}
