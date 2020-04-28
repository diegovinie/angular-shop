import React from 'react';

export let state = {};

export const getActionFromService = (service, actionName) => service &&
  service[actionName] && service[actionName].bind(service);

export const initState = props => {
  state = {...props};
};

export const connect = mapper => Component => {

  return props => {
    const mappedState = mapper(state);

    return <Component {...mappedState} {...props} />;
  };
};
