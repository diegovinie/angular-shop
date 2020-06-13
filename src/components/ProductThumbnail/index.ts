import ProductThumbnail from './ProductThumbnail';
import { connect, getActionFromService } from 'state.jsx';

const mapStateToProps = state => ({
  actions: {
    addProductToCart: getActionFromService(state.cartService, 'addProductToCart')
  }
});

export default connect(mapStateToProps)(ProductThumbnail);
