export default function reducerFactory(defaultState, handlers) {
  return (state = defaultState, action) => {
    const handler = handlers[action.type];

    return handler
      ? handler(state, action)
      : state;
  };
}
