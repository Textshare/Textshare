const initialState = {
  text: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return Object.assign({}, state, { text: action.text });
    default:
      return state;
  }
}
