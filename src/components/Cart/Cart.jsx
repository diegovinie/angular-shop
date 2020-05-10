import React, { useEffect, useState, useMemo } from 'react';
import './Cart.scss';

const OFFSET_HEIGHT = 170;
const PRODUCT_HEIGHT = 48;

const Cart = props => {
  const {
    subject,
    actions
  } = props;

  const [{products, cartTotal}, setState] = useState({products: [], cartTotal: 0})
  const [expanded, setExpanded] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState('0');
  const [animatePlop, setAnimatePlop] = useState(false);
  const [animatePopout, setAnimatePopout] = useState(false);

  const numProducts = useMemo(
    () => products.reduce((acc, product) => {
      acc += product.quantity;
      return acc;
    }, 0),
    [products]
  );

  const deleteProduct = product => () => {
    actions.deleteProductFromCart(product);
  };

  const onCartClick = () => {
    setExpanded(!expanded);
  };

  const currency = num => num.toLocaleString();

  useEffect(
    () => {
      subject.subscribe(setState);

      return subject.unsubscribe;
    },
    []
  );

  useEffect(
    () => {
      // Make a plop animation
      if (numProducts > 1) {
        setAnimatePlop(true);
        setTimeout(() => {
          setAnimatePlop(false);
        }, 160);
      } else if (numProducts === 1) {
        setAnimatePlop(true);
        setTimeout(() => {
          setAnimatePlop(false);
        }, 300);
      }

      setExpandedHeight(
        (products.length * PRODUCT_HEIGHT + OFFSET_HEIGHT) + 'px'
      );

      if (!products.length) setExpanded(false);
    },
    [products.length]
  );

  return (
    <>
      <div id="react-Cart" className={`preview ${expanded ? 'expanded' : ''}`} >
        <button
          type="button"
          className={`circle ${!products.length || expanded ? 'not-shown' : ''}`}
          onClick={onCartClick}
        >
          <img src="../../assets/cart_white.svg" alt="cart" />
          <div className="indicator">
            <span>{numProducts}</span>
          </div>
        </button>
        <div
          className={`fill ${!products.length ? 'not-shown' : ''} ${animatePlop ? 'animate-plop' : ''} ${(animatePopout && !expanded) ? 'shown' : ''}`}
          style={{ height: expanded ? expandedHeight : undefined }}
        >
          <div className={`expanded-info ${expanded ? 'shown' : ''}`} >
            <h3>Esta es tu lista de compras:</h3>
            {products.map(item => (
              <div
                key={`cart-products-${item.product.name}`}
                className="product"
              >
                <div className="row">
                  <div className="col-6-sm description">
                    <p>{item.quantity} x {item.product.name}</p>
                  </div>
                  <div className="col-6-sm price">
                    <p>{ currency(item.quantity * item.product.parsedPrice) }</p>
                  </div>
                </div>
                <button
                  className="delete-btn"
                  onClick={deleteProduct(item.product)}
                >
                  x
                </button>
              </div>
            ))}
            <button
              type="button"
              className="pay-btn"
            >
              Pagar {currency(cartTotal)}
            </button>
          </div>
          {expanded && (
            <button
              type="button"
              className="close-btn"
              onClick={onCartClick}
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
      <div className={`overlay ${expanded ? 'show' : ''}`} />
    </>
  )
};

Cart.defaultProps = {
  products: [],
  cartTotal: 0
};

export default Cart;
