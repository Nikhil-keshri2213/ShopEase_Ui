import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/cart';
import { NumberInput } from '../../components/Number Input/NumberInput';
import { deleteItemFromCartAction, updateItemToCartAction } from '../../store/actions/cartAction';
import DeleteIcon from '../../components/common/DeleteIcon';
import Modal from 'react-modal';
import { customStyles } from '../../styles/modal';
import { isTokenValid } from '../../utils/jwt-helper';
import { Link, useNavigate } from 'react-router-dom';
import EmptyCart from '../../assets/img/empty_cart.png';

Modal.setAppElement('#root'); 

const headers = [
    "Product Details","Price","Quantity","Shipping","SubTotal","Action"
];

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [deleteItem,setDeleteItem] = useState({}); 
  const navigate = useNavigate();

  const onChangeQuantity = useCallback((value,productId,variantId)=>{
    console.log("Received ",value);
    dispatch(updateItemToCartAction({
        productId:productId,
        variant_id:variantId,
        quantity: value
    }))
  },[dispatch]);

  const onDeleteProduct= useCallback((productId,variantId)=>{
    setModalIsOpen(true);
    setDeleteItem({
        productId:productId,
        variantId : variantId
    })
  },[]);

  const onCloseModal = useCallback(()=>{
    setDeleteItem({});
    setModalIsOpen(false);
  },[]);

  const onDeleteItem= useCallback(()=>{
    dispatch(deleteItemFromCartAction(deleteItem));
    setModalIsOpen(false);  
  },[deleteItem, dispatch]);

  // Fixed subtotal calculation
  const subTotal = useMemo(() => {
    let value = 0;
    cartItems?.forEach(item => {
        value += (item?.price || 0) * (item?.quantity || 0);
    });
    return value.toFixed(2);
  }, [cartItems]);

  const isLoggedIn = useMemo(()=>{
    return isTokenValid();
  },[])

console.log("Logged in", isLoggedIn, isTokenValid())
  return (
    <>
    <div className='p-4'>
        {cartItems?.length > 0 && 
        <>
        <p className='text-xl text-black p-4'>Shopping Bag</p>
        <table className='w-full text-lg'>
            <thead className='text-sm bg-black text-white uppercase'>
                <tr>
                    {headers?.map((header, index) => {
                        return (
                            <th key={index} scope='col' className='px-6 py-3'>
                                {header}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    cartItems?.map((item,index)=>{
                        // Calculate individual item subtotal
                        const itemSubtotal = ((item?.price || 0) * (item?.quantity || 0)).toFixed(2);
                        
                        return (
                            <tr key={`${item?.productId}-${item?.variantId || item?.variant?.id}`} className='p-4 bg-white border-b'>
                                <td>
                                    <div className='flex p-4'>
                                       <img src={item?.thumbnail} alt={'product-' + index} className="h-[180px] w-[180px] object-contain p-1" />
                                       <div className="flex flex-col text-base p-4 text-black">
                                            <p>{item?.name || 'Name'}</p>
                                            <p>Brand: {item?.brand}</p>
                                            <p>Size: {item?.variant?.[0]?.size || item?.size}</p>
                                            <p>Color: {item?.variant?.[0]?.color || item?.color}</p>
                                        </div>        
                                    </div>
                                </td>
                                <td>
                                    <p className='text-center text-sm text-gray-600'> Rs. {item?.price}</p>
                                </td>
                                    
                                <td>
                                <NumberInput 
                                    max={5} 
                                    quantity={item?.quantity} 
                                    onChangeQuantity={(value)=> onChangeQuantity(
                                        value, 
                                        item?.productId, 
                                        item?.variantId || item?.variant?.id
                                    )}
                                />
                                </td>

                                <td>
                                <p className='text-center text-sm text-gray-600'>FREE</p>
                                </td>

                                <td>
                                    <p className='text-center text-sm text-gray-600'>Rs. {itemSubtotal}</p>
                                </td>

                                <td>
                                    <button 
                                        className='flex justify-center items-center w-full' 
                                        onClick={()=> onDeleteProduct(
                                            item?.productId, 
                                            item?.variantId || item?.variant?.id
                                        )}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <div className='flex justify-between bg-gray-200 p-8'>
             <div>
                <p className='text-lg font-bold'>Discount Coupon</p>
                <p className='text-sm text-gray-600'>Enter your coupon code</p>
                <form>
                    <input type='text' className='w-[150px] h-[48px] mt-2 border-gray-500 p-2 hover:outline-none' placeholder='Enter code'/>
                    <button type="button" className='w-[80px] h-[48px] bg-black text-white'>Apply</button>
                </form>
            </div>
            <div className='mr-20 pr-8'>
                <div className='flex gap-8 text-lg'><p className='w-[120px]'>SubTotal</p> <p>Rs. {subTotal}</p></div>
                <div className='flex gap-8 text-lg mt-2'><p className='w-[120px]'>Shipping</p> <p>Rs. {0}</p></div>
                <div className='flex gap-8 text-lg mt-2 font-bold'><p className='w-[120px]'>Grand Total</p> <p>Rs. {subTotal}</p></div>
                <hr className='h-[2px] bg-slate-400 mt-2'></hr>

                {isLoggedIn && <button className='w-full items-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800' onClick={()=> navigate("/checkout")}>Checkout</button>}
                {!isLoggedIn && <div className='p-4'><Link to={"/v1/login"} className='w-full p-2 items-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800'>Login to Checkout</Link></div>}
            </div>   
        </div>
        </>}
        {
            !cartItems?.length && 
            <div className='w-full items-center text-center'>
                <div className='flex justify-center'><img src={EmptyCart} className='w-[240px] h-[240px]' alt='empty-cart'/></div>
                <p className='text-3xl font-bold'>Your cart is empty</p>
                <div className='p-4'><Link to={"/"} className='w-full p-2 items-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800'>Continue Shopping</Link></div>
            </div>
        }
    </div>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Remove Item"
      >
      <p>Are you sure you want to remove this item?</p>
      <div className='flex justify-between p-4'>
        <button className='h-[48px]' onClick={onCloseModal}>Cancel</button>
        <button className='bg-black text-white w-[80px] h-[48px] border rounded-lg' onClick={onDeleteItem}>Remove</button>
      </div>  
      </Modal>
    </>
  )
}

export default Cart