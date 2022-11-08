const redux = require("redux")
const createStore = redux.createStore
const combineReducer = redux.combineReducers
const bindActionCreator = redux.bindActionCreators

//const
const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"

const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"

//action creator
const inititalCakeState = {
  cakeQuantity: 10,
}

const inititalIcecreameState = {
  icecreamQuantity: 10,
}

function orderCake(quantity = 1) {
  return {
    type: CAKE_ORDERED,
    payload: quantity,
  }
}

function restockCake(quantity = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: quantity,
  }
}

const cakeReducer = (state = inititalCakeState, actions) => {
  switch (actions.type) {
    case CAKE_ORDERED: {
      return {
        ...state,
        cakeQuantity: state.cakeQuantity - actions.payload,
      }
    }

    case CAKE_RESTOCKED:
      return {
        ...state,
        cakeQuantity: state.cakeQuantity + actions.payload,
      }
    default:
      return state
  }
}

function orderIcecream(quantity = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: quantity,
  }
}

function restockIcecream(quantity = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: quantity,
  }
}

const icecreamReducer = (state = inititalIcecreameState, actions) => {
  switch (actions.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        icecreamQuantity: state.icecreamQuantity - actions.payload,
      }
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        icecreamQuantity: state.icecreamQuantity + actions.payload,
      }
    default:
      return state
  }
}

const rootReducer = combineReducer({
  cake: cakeReducer,
  icecream: icecreamReducer,
})

const store = createStore(rootReducer)

const unsubscribe = store.subscribe(() => {
  console.log("state updated ", store.getState())
})

const actions = bindActionCreator(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
)

actions.orderCake()
actions.orderCake()
actions.restockCake(2)

// icecream

actions.orderIcecream()
actions.orderIcecream()
actions.restockIcecream(2)

unsubscribe()
