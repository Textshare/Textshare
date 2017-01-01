const initialState = {
  sorting: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "SET_SORTING":
      return Object.assign({}, state, { sorting: action.sorting });
    default:
      return state;
  }
}
