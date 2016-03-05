const TestActions = {
  addItem: (item) => {
    return { type: "ADD_TO_ARRAY", item: item}
  },
  removeItem: (item) => {
    return { type: "REMOVE_FROM_ARRAY", item: item }
  }
}

export default TestActions
