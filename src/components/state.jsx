import React from 'react';

export let state;

export const init = props => {
  state = {...props};
};

export const connect = Component => {
  return props => <Component state={{ ...state }} {...props} />;
};
