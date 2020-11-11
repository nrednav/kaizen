import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { fetchOrder, payOrder } from '../../actions/order';
import { deliverOrder } from '../../actions/admin/order';

import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAYMENT_RESET } from '../../constants/order';
import { DELIVER_ORDER_RESET } from '../../constants/admin';

const ViewOrder = ({ match, history }) => {
  const dispatch = useDispatch();

  const fetchedOrder = useSelector((state) => state.fetchedOrder);
  const { order, loading, fetchOrderError } = fetchedOrder;

  const orderPayment = useSelector((state) => state.orderPayment);
  const { loading: paymentLoading, success: paymentSuccess } = orderPayment;

  const orderDeliver = useSelector((state) => state.admin.orderDeliver);
  const { loading: deliverLoading, success: deliverSuccess } = orderDeliver;

  const user = useSelector((state) => state.user);
  const { profile } = user;

  const [sdkReady, setSdkReady] = useState(false);

  const prices = {};

  if (order) {
    prices['subtotal'] =
      order.totalPrice - order.shippingPrice - order.taxPrice;
    prices['shipping'] = order.shippingPrice;
    prices['tax'] = order.taxPrice;
    prices['total'] = order.totalPrice;
  }

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data.clientID}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !order ||
      order._id !== match.params.id ||
      paymentSuccess ||
      deliverSuccess
    ) {
      dispatch({ type: ORDER_PAYMENT_RESET });
      dispatch({ type: DELIVER_ORDER_RESET });
      dispatch(fetchOrder(match.params.id));
    } else if (!order.isPaid && !profile.isAdmin) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, match, order, paymentSuccess, profile, deliverSuccess]);

  const paymentSuccessHandler = (paymentResult) => {
    dispatch(payOrder(order._id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(match.params.id));
  };

  return (
    <div>
      <button
        className='bg-transparent font-semibold p-8 uppercase hover:opacity-75  outline-none'
        onClick={() => history.goBack()}
      >
        <div className='flex flex-row justify-evenly items-center'>
          <i className='ri-arrow-left-line'></i>
          <p className='pl-2'>Back</p>
        </div>
      </button>
      {loading || deliverLoading || paymentLoading ? (
        <Loader />
      ) : fetchOrderError ? (
        <div className='flex justify-center'>
          <Alert
            variant='error'
            message={fetchOrderError}
            className='w-1/2'
          ></Alert>
        </div>
      ) : (
        order && (
          <div className='flex flex-col mb-4'>
            <div className='text-2xl sm:text-3xl flex flex-col sm:flex-row w-11/12 mx-auto sm:w-10/12 px-4 pb-8'>
              <div className='flex flex-row'>
                <i className='ri-bill-line'></i>
                <h1 className='ml-4'>Order</h1>
              </div>
              <p className='text-blue-600 sm:px-4'>{match.params.id}</p>
            </div>
            <div className='flex flex-col lg:flex-row lg:justify-between mx-auto w-11/12 sm:w-10/12'>
              <div className='lg:w-6/12'>
                <div className='px-4 py-2 border-b-2 border-gray-400'>
                  <div className='text-2xl sm:text-3xl flex flex-row'>
                    <i className='ri-truck-fill'></i>
                    <h1 className='ml-4'>Shipping Details</h1>
                  </div>
                  <p className='py-2 pt-4'>Name: {order.user.name}</p>
                  <p className='py-2'>Email Address: {order.user.email}</p>
                  <p className='py-2'>{`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}</p>
                  <p className='py-2'>
                    Delivery Status:{' '}
                    <span
                      className={`${
                        order.isDelivered ? 'text-green-600' : 'text-red-700'
                      } font-semibold`}
                    >
                      {order.isDelivered
                        ? `Delivered at ${order.deliveredAt}`
                        : 'Not Delivered Yet'}
                    </span>
                  </p>
                </div>
                <div className='px-4 py-2 border-b-2 border-gray-400'>
                  <div className='text-2xl sm:text-3xl flex flex-row'>
                    <i className='ri-money-dollar-circle-fill'></i>
                    <h1 className='ml-4'>Payment</h1>
                  </div>
                  <p className='py-2 pt-4'>Method: {order.paymentMethod}</p>
                  <p className='py-2'>
                    Payment Status:{' '}
                    <span
                      className={`${
                        order.isPaid ? 'text-green-600' : 'text-red-700'
                      } font-semibold`}
                    >
                      {order.isPaid ? `Paid at ${order.paidAt}` : 'Not Paid'}
                    </span>
                  </p>
                </div>
                <div className='px-4 py-2 border-b-2 lg:border-b-0 border-gray-400'>
                  <div className='text-2xl sm:text-3xl flex flex-row'>
                    <i className='ri-shopping-cart-fill'></i>
                    <h1 className='ml-4'>Order Items</h1>
                  </div>
                  <div className='py-4'>
                    {order.orderItems.map((item) => (
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
                      <p className='ml-4 font-semibold'>
                        ${prices[key].toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                {!order.isPaid && !profile.isAdmin && (
                  <div>
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <div
                        className='w-3/4 mx-auto'
                        id='paypal-button-container'
                      >
                        <PayPalButton
                          amount={order.totalPrice.toFixed(2)}
                          onSuccess={paymentSuccessHandler}
                        />
                      </div>
                    )}
                  </div>
                )}
                {profile &&
                  profile.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <div className='flex w-full'>
                      <button
                        onClick={deliverHandler}
                        className=' text-base uppercase border h-12 px-4 text-white bg-gray-800 hover:opacity-75 justify-self-center mx-auto w-3/4'
                      >
                        Mark as delivered
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ViewOrder;
