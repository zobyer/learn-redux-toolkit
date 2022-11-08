const redux = require("redux")
const createStore = redux.createStore
const bindActionCreator = redux.bindActionCreators

//immer
const produce = require("immer").produce

const UPDATE_STREET = "UPDATE_STREET"

const initialState = {
  name: "",
  address: {
    street: "",
    city: "",
    state: "",
  },
}

function updateStreet(street = "") {
  return {
    type: UPDATE_STREET,
    payload: street,
  }
}

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STREET:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   }
      return produce(state, (draft) => {
        draft.address.street = draft.address.street + action.payload
      })
  }
}

const store = createStore(addressReducer)

const unsubscribe = store.subscribe(() => {
  console.log("subscribed value ", store.getState())
})

const action = bindActionCreator({ updateStreet }, store.dispatch)

action.updateStreet("dhaka")
action.updateStreet("Dohs")

unsubscribe()
