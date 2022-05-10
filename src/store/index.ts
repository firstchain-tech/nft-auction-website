import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const storeEnhancer = applyMiddleware(thunkMiddleware)
// const storeEnhancer = applyMiddleware()

const store = createStore(reducers, composeEnhancers(storeEnhancer))

export default store
