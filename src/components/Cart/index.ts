import Cart from './Cart';
import { connect, getActionFromService } from 'state.jsx';

const mapStateToProps = (state: any) => {
  const service = state.cartService;
  return {
    subject: service.productAdded$,
    actions: {
      deleteProductFromCart: getActionFromService(service, 'deleteProductFromCart')
    }
  };
}

export default connect(mapStateToProps)(Cart);
