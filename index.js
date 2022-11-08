console.log("From index.js")

const redux = require("redux")
const createStore = redux.createStore
const bindActionCreator = redux.bindActionCreators

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

const store = createStore(reducer)

console.log("initial State ", store.getState())

const unsubscribe = store.subscribe(() => {
  console.log("state updated ", store.getState())
})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(2))

const actions = bindActionCreator({ orderCake, restockCake }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.restockCake(2)

unsubscribe()
