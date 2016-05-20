const initialState = {
  errors: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "REGISTRATION_ERROR":
      return Object.assign({}, state, { errors: action.errors });
    case "REGISTRATION_SUCCEEDED":
      return Object.assign({}, state, { errors: null });
    default:
      return state;
  }
}
