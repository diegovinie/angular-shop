import React from 'react';
import { Product } from 'shared/models';
import ProductThumbnail from 'components/ProductThumbnail';
import './Showcase.scss';

export interface Props {
  products: Array<Product>;
}

const Showcase: React.FC<Props> = props => {
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
