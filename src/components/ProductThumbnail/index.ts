import ProductThumbnail from './ProductThumbnail';
import { connect, getActionFromService } from 'store';

const mapStateToProps = (state: any) => ({
  actions: {
    addProductToCart: getActionFromService(state.cartService, 'addProductToCart')
  }
});

export default connect(mapStateToProps)(ProductThumbnail);
