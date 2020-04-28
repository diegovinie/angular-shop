import React from 'react';
import ReactDOM from 'react-dom';

export const mountComponent = id => (Component, props) => {
  const el = document.getElementById(id);

  el && ReactDOM.render(
    React.createElement(Component, props),
    el
  );
};
