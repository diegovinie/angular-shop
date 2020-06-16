import React from 'react';
import { Service } from 'shared/interfaces';

export let state = {};

export const getActionFromService: Function = (service: Service, actionName: keyof Service) => {
  const fn: Function = service[actionName];
  return fn.bind(service);
}

export const initState = (props: object) => {
  state = {...props};
};

export const connect = (mapper: Function) => (Component: React.FC<any>) => {

  return (props: any) => {
    const mappedState = mapper(state);

    return <Component {...mappedState} {...props} />;
  };
};
