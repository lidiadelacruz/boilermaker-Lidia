import axios from 'axios'

//ACTION TYPE
const GOT_USER = 'GOT_USER'

// ACTION CREATOR
const gotUser = user => ({ type: GOT_USER, user})


const initialState = {
  name: "Not logged in"
};

//THUNK
export const login = (name, password) => async dispatch => {
  try {
    const { data } = await axios.put('/auth/login', { name, password })
    dispatch(gotUser(data))
  } catch (error) {
    console.error(error)
  }
}

export const me = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me')
    dispatch(gotUser(data || initialState)) // we do not want to dispath null or undefined use ||
  } catch (error) {
    console.error(error)
  }
}
//REDUCER
function userReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user
    default:
      return state;
  }
}

export default userReducer;
