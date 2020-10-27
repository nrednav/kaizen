import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createOrder } from '../../actions/order';

import CheckoutSteps from '../../components/CheckoutSteps';
import Alert from '../../components/Alert';

const OrderPlacement = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { items } = cart;

  const checkout = useSelector((state) => state.checkout);
  const { shippingAddress, paymentMethod } = checkout;

  const prices = {
    subtotal: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  };
  prices['shipping'] = prices['subtotal'] > 100 ? 50 : 0;
  prices['tax'] = 0.05 * prices['subtotal'];
  prices['total'] = prices['subtotal'] + prices['shipping'] + prices['tax'];

  const createdOrder = useSelector((state) => state.createdOrder);
  const { order, success, createOrderError } = createdOrder;

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
  }, [success, history, order]);

  const placeOrderHandler = () => {
    var order = { orderItems: items, shippingAddress, paymentMethod, prices };
    dispatch(createOrder(order));
  };

  return (
    <div className='flex flex-col mb-4'>
      <div className='self-center'>
        <CheckoutSteps activeSteps={[0, 1, 2, 3]} />
      </div>
      {createOrderError && (
        <div className='flex justify-center py-4'>
          <Alert variant='error' message={createOrderError} className='w-3/4' />
        </div>
      )}
      <div className='flex flex-col lg:flex-row lg:justify-between mx-auto w-11/12 sm:w-10/12'>
        <div className='lg:w-6/12'>
          <div className='px-4 py-2 border-b-2 border-gray-400'>
            <div className='text-2xl sm:text-3xl flex flex-row'>
              <i className='ri-truck-fill'></i>
              <h1 className='ml-4'>Shipping Details</h1>
            </div>
            <p className='py-4'>{`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}</p>
          </div>
          <div className='px-4 py-2 border-b-2 border-gray-400'>
            <div className='text-2xl sm:text-3xl flex flex-row'>
              <i className='ri-money-dollar-circle-fill'></i>
              <h1 className='ml-4'>Payment Method</h1>
            </div>
            <p className='py-4'>{paymentMethod}</p>
          </div>
          <div className='px-4 py-2 border-b-2 lg:border-b-0 border-gray-400'>
            <div className='text-2xl sm:text-3xl flex flex-row'>
              <i className='ri-shopping-cart-fill'></i>
              <h1 className='ml-4'>Order Items</h1>
            </div>
            <div className='py-4'>
              {items.map((item) => (
                <div
                  className='flex flex-row py-4 items-center'
                  key={item.product}
                >
                  <div className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden border border-gray-800 shadow-lg '>
                    <img
                      className='object-cover object-center w-full h-full'
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className='ml-4 flex flex-col sm:flex-row sm:justify-between sm:w-full'>
                    <p>{item.name}</p>
                    <p className='font-semibold'>{`${item.quantity} x $${
                      item.price
                    } = $${item.price * item.quantity}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='px-4 py-2 lg:w-5/12'>
          <div className='text-2xl sm:text-3xl flex flex-row'>
            <i className='ri-bill-fill'></i>
            <h1 className='ml-4'>Order Summary</h1>
          </div>
          <div className='my-4'>
            {Object.keys(prices).map((key) => (
              <div
                className='flex flex-row justify-between text-md sm:text-xl border-b-2 border-gray-400 py-4'
                key={`price-${key}`}
              >
                <p>{`${key[0].toUpperCase()}${key.slice(1)}`}:</p>
                <p className='ml-4 font-semibold'>${prices[key].toFixed(2)}</p>
              </div>
            ))}
            <div className='flex flex-row lg:text-xl py-4 justify-center mt-4'>
              <button
                onClick={placeOrderHandler}
                className={
                  `${items.length === 0 ? 'cursor-not-allowed' : ''}` +
                  ' text-base uppercase border w-3/4 h-12 px-4 text-white bg-gray-800 hover:opacity-75'
                }
                disabled={items.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacement;
