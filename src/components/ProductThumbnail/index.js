import ProductThumbnail from './ProductThumbnail.jsx';
import { connect, getActionFromService } from '../../state.jsx';

const mapStateToProps = state => ({
  actions: {
    addProductToCart: getActionFromService(state.cartService, 'addProductToCart')
  }
});

export default connect(mapStateToProps)(ProductThumbnail);
