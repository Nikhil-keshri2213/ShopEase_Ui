import { getProductBySlug } from '../api/fetchProducts.jsx';
import content from '../data/content.json';
import { setLoading } from '../store/features/common.js';

import store from '../store/store'

// export const loadProductBySlug = ({ params }) => {
//   const productId = params?.productId?.toString();
//   const product = content?.products?.find((p) => p?.id?.toString() === productId);
  
//   return { product };
// };

export const loadProductBySlug = async ({ params }) => {
  try{
    store.dispatch(setLoading(true));
    const product = await getProductBySlug(params?.slug);
    store.dispatch(setLoading(false));
    return {product}
  }
  catch(err){
    console.error(err);
  }
};
