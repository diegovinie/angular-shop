import React from 'react';
import ProductThumbnail from '../ProductThumbnail';

const Showcase = props => {
  const { products } = props;

  return (
    <div id="react-Showcase" className="showcase row">
      {products.map(product => (
        <ProductThumbnail
          key={product.name}
          product={product}
          className="col-4"
        />
      ))}
    </div>
  );
};

Showcase.defaultProps = {
  products: []
};

export default Showcase;
