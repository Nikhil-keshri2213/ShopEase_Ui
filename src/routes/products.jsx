import content from '../data/content.json';

export const loadProductById = ({ params }) => {
  const productId = params?.productId?.toString();
  const product = content?.products?.find((p) => p?.id?.toString() === productId);
  
  return { product };
};
