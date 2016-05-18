const initialState = {
  currentUser: null,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, currentUser: action.currentUser, error: null };

    case "SESSIONS_ERROR":
      return { ...state, error: action.error };

    case "USER_SIGNED_OUT":
      return initialState;

    default:
      return state;
  }
}
