const initialState = [
  { id: new Date().getTime(), text: "test" }
]

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_ARRAY":
      return state.concat(action.item)
    case "REMOVE_FROM_ARRAY":
      return state.filter((item) => item !== action.item)
    default:
      return state
  }
}
