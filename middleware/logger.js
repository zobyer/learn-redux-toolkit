const redux = require("redux")
const createStore = redux.createStore
const bindActionCreator = redux.bindActionCreators

// middleware
const applyMiddleware = redux.applyMiddleware

//logger
const reduxLogger = require("redux-logger")
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  }
}

function restockCake(quantity = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: quantity,
  }
}

const initialState = {
  numOfCakes: 10,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED: {
      return { ...state, numOfCakes: state.numOfCakes - 1 }
    }
    case CAKE_RESTOCKED:
      return { ...state, numOfCakes: state.numOfCakes + action.payload }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(logger))

console.log("initial State ", store.getState())

const unsubscribe = store.subscribe(() => {
  //console.log("state updated ", store.getState())
})

const actions = bindActionCreator({ orderCake, restockCake }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.restockCake(2)

unsubscribe()
