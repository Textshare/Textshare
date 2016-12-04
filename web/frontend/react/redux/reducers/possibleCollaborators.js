export default function possibleCollaboratorsReducer(state = {}, action) {
  switch (action.type) {
    case "RESPONSE_POSSIBLE_COLLABORATORS": {
      const newPossibleCollaborators = action.data.reduce((acc, possibleCollaborator) => {
        return Object.assign(acc, { [possibleCollaborator.id]: possibleCollaborator })
      }, {})
      return Object.assign({}, state, newPossibleCollaborators)
    }

    default:
      return state
  }
}
