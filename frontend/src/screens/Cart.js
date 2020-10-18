import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../actions/cart';

import Alert from '../components/Alert';

const Cart = ({ match, location, history }) => {
  const productID = match.params.id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { items } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, quantity));
    }
  }, [productID, quantity, dispatch]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div className='flex flex-col lg:flex-row mb-4 items-center lg:items-start lg:justify-between'>
      <div className='w-10/12 lg:w-6/12 mt-8 lg:ml-8'>
        <div className='mt-4 text-3xl flex flex-row'>
          <i className='ri-shopping-cart-fill'></i>
          <h1 className='ml-4'>Shopping Cart</h1>
        </div>
        {items.length === 0 ? (
          <Alert variant='info' message='Your cart is currently empty.' />
        ) : (
          <>
            <div className='md:hidden'>
              <div className='flex flex-row mt-4 border border-green-600 font-semibold text-center'>
                <div className='w-2/12'>Image</div>
                <div className='w-4/12'>Details</div>
                <div className='w-3/12'>Quantity</div>
                <div className='w-3/12'>Actions</div>
              </div>
              {items.map((item) => (
                <div className='mt-4 flex flex-row' key={item.id}>
                  <div className='w-2/12 overflow-hidden'>
                    <img
                      className='object-cover object-center border border-gray-800 shadow-lg'
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className='w-4/12 flex flex-col justify-center items-center'>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                  </div>
                  <div className='w-3/12 flex items-center justify-center'>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(addToCart(item.id, Number(e.target.value)))
                      }
                      className='block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    >
                      {[...Array(item.countInStock).keys()].map((val) => (
                        <option key={val + 1} value={val + 1}>
                          {val + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='w-3/12 flex items-center justify-center'>
                    <button
                      className='flex flex-row items-center'
                      onClick={() => removeFromCartHandler(item.id)}
                      title='Remove from cart'
                    >
                      <i className='ri-delete-bin-fill text-2xl text-gray-600'></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className='hidden md:flex flex-col mt-4 w-full'>
              <div className='flex flex-row border-b-2 border-gray-400 py-4 font-semibold text-center'>
                <div className='w-1/12'>Image</div>
                <div className='w-3/12'>Name</div>
                <div className='w-3/12'>Price</div>
                <div className='w-3/12'>Quantity</div>
                <div className='w-2/12'>Actions</div>
              </div>
              {items.map((item) => (
                <div className='flex flex-row mt-4' key={item.id}>
                  <div className='w-1/12 overflow-hidden border border-gray-800 shadow-lg '>
                    <img
                      className='object-cover object-center w-full h-full'
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className='w-3/12 flex items-center justify-center'>
                    <p>{item.name}</p>
                  </div>
                  <div className='w-3/12 flex items-center justify-center'>
                    <p>${item.price}</p>
                  </div>
                  <div className='w-3/12 flex items-center justify-center'>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(addToCart(item.id, Number(e.target.value)))
                      }
                      className='block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    >
                      {[...Array(item.countInStock).keys()].map((val) => (
                        <option key={val + 1} value={val + 1}>
                          {val + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='w-2/12 flex items-center justify-center'>
                    <button
                      className='flex flex-row items-center'
                      onClick={() => removeFromCartHandler(item.id)}
                      title='Remove from cart'
                    >
                      <i className='ri-delete-bin-fill text-2xl text-gray-600'></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className='w-10/12 lg:w-4/12 lg:mr-16 mt-8'>
        <div className='mt-4 text-3xl flex flex-row'>
          <i className='ri-bill-fill'></i>
          <h1 className='ml-4'>Summary</h1>
        </div>
        <div className='flex flex-col mt-4 uppercase'>
          <div className='flex flex-row text-xl border-b-2 border-gray-400 py-4'>
            <p>Quantity:</p>
            <p className='ml-4 font-semibold'>
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
          </div>
          <div className='flex flex-row text-xl border-b-2 border-gray-400 py-4'>
            <p>Subtotal:</p>
            <p className='ml-4 font-semibold'>
              $
              {items
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </p>
          </div>
          <div className='flex flex-row lg:text-xl py-4 justify-center mt-4'>
            <button
              onClick={() => checkoutHandler()}
              className={
                `${items.length === 0 ? 'cursor-not-allowed' : ''}` +
                ' text-base uppercase border w-3/4 h-12 px-4 text-white bg-gray-800 hover:opacity-75'
              }
              disabled={items.length === 0}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
