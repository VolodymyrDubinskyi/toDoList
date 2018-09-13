const createStore = (reducer) => {
  let state = reducer({}, {});
  const subscribers = [];
  const store = {
    dispatch: (action) => {
      state = reducer(state, action);
      subscribers.forEach(handler => handler());
    },
    getState: () => state,
    subscribe: (handler) => {
      subscribers.push(handler);
      return () => {
        const index = subscribers.indexOf(handler);
        subscribers.splice(index, 1);
      };
    },
  };
  return store;
};

export default createStore
