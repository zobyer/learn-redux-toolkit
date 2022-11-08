const redux = require("redux")
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const axios = require("axios")
const thunkMiddleware = require("redux-thunk").default

const initialState = {
  loading: false,
  user: [],
  errorMessage: "",
}

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED"
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED"
const FETCH_USER_FAILED = "FETCH_USER_FAILED"

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUESTED,
  }
}

const fetchUserSucceeded = (user) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: user,
  }
}

const fetchUserFailed = (error) => {
  return {
    type: FETCH_USER_FAILED,
    payload: error,
  }
}

const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED: {
      return {
        ...state,
        loading: true,
      }
    }
    case FETCH_USER_SUCCEEDED: {
      console.log("called success", action.payload)
      return {
        loading: false,
        user: action.payload,
        ...state,
      }
    }
    case FETCH_USER_FAILED: {
      return {
        loading: false,
        user: [],
        errorMessage: action.payload,
      }
    }
  }
}

const fetchUsers = () => {
  return async function (dispatch) {
    dispatch(fetchUserRequest())
    dispatch(fetchUserSucceeded([123]))

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // console.log(response)
        const users = response.data.map((user) => user.id)
        // console.log(users)
        dispatch(fetchUserSucceeded([45]))
      })
      .catch((error) => {
        //console.log(error)
        //  dispatch(fetchUserFailed(error.message))
      })

    // const response = await axios.get(
    //   "https://jsonplaceholder.typicode.com/users"
    // )
    // dispatch(fetchUserSucceeded(response.data))
  }
}

const store = createStore(fetchUserReducer, applyMiddleware(thunkMiddleware))

const unsubscribe = store.subscribe(() => {
  console.log("state updated ", store.getState())
})
store.dispatch(fetchUsers())

unsubscribe()
