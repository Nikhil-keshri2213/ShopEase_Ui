import { addToCart, updateQuantity, removeFromCart, deleteCart} from "../features/cart"

export const addItemToCartAction = (productItem) => {
    return (dispatch, state) =>{
        dispatch(addToCart(productItem));
        const {cartState} = state();
        localStorage.setItem('cart',JSON.stringify(cartState?.cart))
    }
}

export const updateItemToCartAction = (productItem) => {
    return(dispatch, state) =>{
        dispatch(updateQuantity({
            variant_id: productItem?.variant_id,
            quantity: productItem?.quantity
        }))
        const {cartState} = state();
        localStorage.setItem('cart',JSON.stringify(cartState?.cart))
    }
}

export const deleteItemFromCartAction = (payload) => {
    return (dispatch, state)=>{
        dispatch(removeFromCart(payload));
        updateLocalStorage(state);
    }
}

const updateLocalStorage = (state) => {
    const {cartState} = state();
    localStorage.setItem('cart',JSON.stringify(cartState?.cart))
}

export const clearCart = () => {
    return (dispatch, state) =>{
       dispatch(deleteCart());
       localStorage.removeItem('cart');
    }
}