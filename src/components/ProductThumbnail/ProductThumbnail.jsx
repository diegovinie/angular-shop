import React, { useState } from 'react';
import './ProductThumbnail.scss';
// import { CartService } from '../../app/cart.service';

const ProductThumbnail = props => {
  const {
    product,
    className,
    actions
  } = props;

  const [detailViewActive, setDetailViewActive] = useState(false);

  const onProductClick = () => {
    setDetailViewActive(!detailViewActive);
  };

  const onAddToCart = () => {
    actions.addProductToCart(product);
  };

  return (
    <div className={` product-thumbnail wrapper ${className} ${!product.available ? 'unavailable' : ''}`} >
      <div className="info" >
        <div className="img-wrapper">
          <img className="img" src={product.img} />
          <div className="img-placeholder" />
        </div>
        <h5 className="title">{product.name}</h5>
        <p className="price">$<span>{product.price}</span></p>
        <div className="details">
          {product.available && (
            <div className="available">
              <hr />
              <div className="row">
                <div className="col-8-sm view-details-wrapper">
                  <button
                    type="button"
                    className="view"
                    onClick={onProductClick}
                  >
                    Ver detalles
                  </button>
                </div>
                <div className="col-4-sm add-cart-wrapper">
                  <button
                    type="button"
                    className="cart"
                    onClick={onAddToCart}
                  >
                    <img src="assets/cart_primary.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {!product.available && (
            <div className="not-available">
              <hr />
              <p>No disponible</p>
            </div>
          )}
        </div>
        {/* span className="category-name" *ngFor='let category of product.categories'>{{category}} */}
        <div className={`detail-view ${detailViewActive ? 'active' : ''}`}>
            <div className={`bg ${detailViewActive ? 'shown' : ''}`} />
            <div className="info-wrapper">
              <p className="d-holder d-title">{product.name}</p>
              <p className="d-holder d-price">$ {product.price}</p>
              <p className="d-holder d-description">{product.description}</p>
            </div>
            <button
              type="button"
              className="hide-detail-btn"
              onClick={onProductClick}
            >
              Ocultar
            </button>
          </div>
      </div>
      {product.best_seller && (
        <div className={`bestseller-badge ${detailViewActive ? 'in-detailed' : ''}`} >
          <span className="star left">&nbsp;</span>
          <span className="txt">Bestseller</span>
          <span className="star right">&nbsp;</span>
        </div>
      )}
    </div>
  );
};

ProductThumbnail.defaultProps = {
  className: ''
};

export default ProductThumbnail;
