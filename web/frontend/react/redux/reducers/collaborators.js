export default function collaboratorsReducer(state = {}, action) {
  switch (action.type) {
    case "RESPONSE_COLLABORATORS": {
      const newCollaborators = action.data.reduce((acc, collaborator) => {
        return Object.assign(acc, { [collaborator.id]: collaborator })
      }, {})
      return Object.assign({}, state, newCollaborators)
    }

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
