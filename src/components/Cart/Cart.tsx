import React, { useEffect, useState, useMemo } from 'react';
import { Subject, Subscription } from 'rxjs';
import { Product } from 'shared/models';
import './Cart.scss';

const OFFSET_HEIGHT = 170;
const PRODUCT_HEIGHT = 48;

type CartItem = {
  product: Product;
  quantity: number;
}

type StateType = {
  products: Array<CartItem>;
  cartTotal: number[] | 0;
}

export interface Props {
  subject: Subject<StateType>;
  actions: {
    deleteProductFromCart: Function
  };
}

const Cart: React.FC<Props> = props => {
  const {
    subject,
    actions
  } = props;

  const [{products, cartTotal}, setState] = useState<StateType>({products: [], cartTotal: 0})
  const [expanded, setExpanded] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState('0');
  const [animatePlop, setAnimatePlop] = useState(false);
  // const [animatePopout, setAnimatePopout] = useState(false);
  const animatePopout = false;

  const numProducts = useMemo(
    () => products.reduce((acc, product: CartItem) => {
      acc += product.quantity;
      return acc;
    }, 0),
    [products]
  );

  const deleteProduct = (product: Product) => () => {
    actions.deleteProductFromCart(product);
  };

  const onCartClick = () => {
    setExpanded(!expanded);
  };

  const currency = (num: number | number[]) => num.toLocaleString();

  function onEmit<StateType>(source: Subject<StateType>, nextFn: (value: StateType) => void): Subscription {
    return source.subscribe(nextFn);
  }
  
  useEffect(
    () => {
      onEmit<StateType>(subject, setState);

      return subject.unsubscribe;
    },
    // eslint-disable-next-line
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
    [products.length, numProducts]
  );

  return (
    <>
      <div id="react-Cart" className={`preview ${expanded ? 'expanded' : ''}`} >
        <button
          type="button"
          className={`circle ${!products.length || expanded ? 'not-shown' : ''}`}
          onClick={onCartClick}
        >
          <img src="assets/cart_white.svg" alt="cart" />
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

export default Cart;
