export default function tagsReducer(state = {}, action) {
  switch (action.type) {
    case "RESPONSE_TAGS": {
      const newTags = action.data.reduce((acc, tag) => {
        return Object.assign(acc, { [tag.id]: tag })
      }, {})
      return Object.assign({}, state, newTags)
    }

    case "RESPONSE_TAG": {
      return Object.assign({}, state, { [action.tag.id]: action.tag })
    }

    default:
      return state
  }
}
