import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrder } from '../../actions/order';

import Alert from '../../components/Alert';
import Loader from '../../components/Loader';

const ViewOrder = ({ match, history }) => {
  const dispatch = useDispatch();

  const fetchedOrder = useSelector((state) => state.fetchedOrder);
  const { order, loading, fetchOrderError } = fetchedOrder;

  const prices = {};

  if (order) {
    prices['subtotal'] =
      order.totalPrice - order.shippingPrice - order.taxPrice;
    prices['shipping'] = order.shippingPrice;
    prices['tax'] = order.taxPrice;
    prices['total'] = order.totalPrice;
  }

  useEffect(() => {
    if (!order || order._id !== match.params.id) {
      dispatch(fetchOrder(match.params.id));
    }
  }, [dispatch, match, order]);

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
      {loading ? (
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
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
  // return (
  //   <div className='flex flex-col mb-4'>
  //     {/* {fetchOrderError && (
  //       <div className='flex justify-center py-4'>
  //         <Alert variant='error' message={fetchOrderError} className='w-3/4' />
  //       </div>
  //     )} */}
  //     <div className='flex flex-col lg:flex-row lg:justify-between mx-auto w-11/12 sm:w-10/12'>
  //       <div className='lg:w-6/12'>
  //         <div className='px-4 py-2 border-b-2 border-gray-400'>
  //           <div className='text-2xl sm:text-3xl flex flex-row'>
  //             <i className='ri-truck-fill'></i>
  //             <h1 className='ml-4'>Shipping Details</h1>
  //           </div>
  //           <p className='py-4'>{`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}</p>
  //         </div>
  //         <div className='px-4 py-2 border-b-2 border-gray-400'>
  //           <div className='text-2xl sm:text-3xl flex flex-row'>
  //             <i className='ri-money-dollar-circle-fill'></i>
  //             <h1 className='ml-4'>Payment Method</h1>
  //           </div>
  //           <p className='py-4'>{paymentMethod}</p>
  //         </div>
  //         <div className='px-4 py-2 border-b-2 lg:border-b-0 border-gray-400'>
  //           <div className='text-2xl sm:text-3xl flex flex-row'>
  //             <i className='ri-shopping-cart-fill'></i>
  //             <h1 className='ml-4'>Order Items</h1>
  //           </div>
  //           <div className='py-4'>
  //             {items.map((item) => (
  //               <div
  //                 className='flex flex-row py-4 items-center'
  //                 key={item.product}
  //               >
  //                 <div className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden border border-gray-800 shadow-lg '>
  //                   <img
  //                     className='object-cover object-center w-full h-full'
  //                     src={item.image}
  //                     alt={item.name}
  //                   />
  //                 </div>
  //                 <div className='ml-4 flex flex-col sm:flex-row sm:justify-between sm:w-full'>
  //                   <p>{item.name}</p>
  //                   <p className='font-semibold'>{`${item.quantity} x $${
  //                     item.price
  //                   } = $${item.price * item.quantity}`}</p>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //       <div className='px-4 py-2 lg:w-5/12'>
  //         <div className='text-2xl sm:text-3xl flex flex-row'>
  //           <i className='ri-bill-fill'></i>
  //           <h1 className='ml-4'>Order Summary</h1>
  //         </div>
  //         <div className='my-4'>
  //           {Object.keys(prices).map((key) => (
  //             <div
  //               className='flex flex-row justify-between text-md sm:text-xl border-b-2 border-gray-400 py-4'
  //               key={`price-${key}`}
  //             >
  //               <p>{`${key[0].toUpperCase()}${key.slice(1)}`}:</p>
  //               <p className='ml-4 font-semibold'>${prices[key].toFixed(2)}</p>
  //             </div>
  //           ))}
  //           <div className='flex flex-row lg:text-xl py-4 justify-center mt-4'>
  //             <button
  //               onClick={placeOrderHandler}
  //               className={
  //                 `${items.length === 0 ? 'cursor-not-allowed' : ''}` +
  //                 ' text-base uppercase border w-3/4 h-12 px-4 text-white bg-gray-800 hover:opacity-75'
  //               }
  //               disabled={items.length === 0}
  //             >
  //               Place Order
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ViewOrder;
