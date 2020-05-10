import Cart from './Cart.jsx';
import { connect, getActionFromService } from '../../state.jsx';

const mapStateToProps = state => {
  const service = state.cartService;
  return {
    subject: service.productAdded$,
    actions: {
      deleteProductFromCart: getActionFromService(service, 'deleteProductFromCart')
    }
  };
}

export default connect(mapStateToProps)(Cart);
