const createStore = (reducer) => {
  let state = reducer({}, {});
  let subscribers = [];
  const store = {
    dispatch: (action) => {
      state = reducer(state, action);
      subscribers.forEach(handler => handler());
    },
    getState: () => state,
    getSubscribers: () => subscribers,
    subscribe: (handler) => {
      subscribers.push(handler);
      return () => {
        const index = subscribers.indexOf(handler)
        subscribers = [
          ...subscribers.slice(0, index),
          ...subscribers.slice(index + 1),
        ]
      }
    },
  };
  return store;
};

export default createStore
