const initialState = {
  currentUser: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, currentUser: action.currentUser };

    default:
      return state;
  }
}
