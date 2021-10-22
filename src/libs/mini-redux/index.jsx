import React from 'react';

function middlewareLog(store, lastState, nextState, action) {
  if (store.isDev) {
    console.log(
      `%c|------- redux: ${action.type} -------|`,
      `background: rgb(70, 70, 70); color: rgb(240, 235, 200); width:100%;`,
    );
    console.log('|--last:', lastState);
    console.log('|--next:', nextState);
  }
}

function reducerInAction(state, action) {
  if (typeof action.reducer === 'function') {
    return action.reducer(state);
  }
  return state;
}

export default function createStore(params) {
  const { isDev, reducer, initialState, middleware } = {
    isDev: false,
    reducer: reducerInAction,
    initialState: {},
    middleware: params.isDev ? [middlewareLog] : [],
    ...params,
  };
  const AppContext = params.context;

  const store = {
    isDev,
    _state: initialState,
    dispatch: undefined,
    initialState,
  };
  let isCheckedMiddleware = false;
  const middlewareReducer = function(lastState, action) {
    let nextState = reducer(lastState, action);
    if (!isCheckedMiddleware) {
      if (Object.prototype.toString.call(middleware) !== '[object Array]') {
        throw new Error("react-hooks-redux: middleware isn't Array");
      }
      isCheckedMiddleware = true;
    }
    for (let i = 0; i < middleware.length; i++) {
      const newState = middleware[i](store, lastState, nextState, action);
      if (newState) {
        nextState = newState;
      }
    }
    store._state = nextState;
    return nextState;
  };

  const Provider = props => {
    const [state, dispatch] = React.useReducer(middlewareReducer, initialState);
    if (!store.dispatch) {
      store.dispatch = async function(action) {
        if (typeof action === 'function') {
          await action(dispatch, store._state);
        } else {
          dispatch(action);
        }
      };
    }
    return <AppContext.Provider {...props} value={state} />;
  };
  return { Provider, store };
}
