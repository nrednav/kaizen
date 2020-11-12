import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchUserOrders } from '../../actions/order';
import Loader from '../../components/Loader';

import { FadeTransition } from '../../animations/FadeTransition';

const UserProfileOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userOrders = useSelector((state) => state.userOrders);
  const { loading, orders } = userOrders;

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return (
    <FadeTransition>
      {loading ? (
        <Loader />
      ) : (
        <>
          {orders && orders.length === 0 && (
            <div className='flex justify-start py-4'>
              <h1>No orders found...</h1>
            </div>
          )}
          {orders && orders.length > 0 && (
            <div className='flex flex-col'>
              {buildHeaderRow()}
              {orders.map((order) => (
                <div
                  key={order._id}
                  className='flex flex-row h-16 bg-gray-300 hover:bg-gray-100'
                >
                  {buildCell(<p className='truncate'>{order._id}</p>, '')}
                  {buildCell(order.createdAt.substring(0, 10), 'truncate')}
                  {buildCell(`$${order.totalPrice}`, 'hidden lg:flex')}
                  {buildCell(
                    <i
                      className={`${
                        order.isPaid
                          ? 'ri-check-line text-green-700'
                          : 'ri-close-line text-red-700'
                      } text-2xl`}
                    ></i>,
                    'hidden lg:flex'
                  )}
                  {buildCell(
                    <i
                      className={`${
                        order.isDelivered
                          ? 'ri-check-line text-green-700'
                          : 'ri-close-line text-red-700'
                      } text-2xl`}
                    ></i>,
                    'hidden lg:flex'
                  )}
                  {buildCell(
                    <button
                      className='hover:opacity-75  w-full h-full text-gray-800 flex items-center justify-center'
                      onClick={() => history.push(`/orders/${order._id}`)}
                    >
                      <i className='text-2xl ri-eye-fill mx-2'></i>
                      <p className='mx-2'>View</p>
                    </button>,
                    'justify-center'
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </FadeTransition>
  );
};

const buildHeaderRow = () => {
  return (
    <div className='flex flex-row justify-start h-12'>
      {buildCell('ID', 'font-semibold')}
      {buildCell('Date', 'font-semibold')}
      {buildCell('Total', 'font-semibold hidden lg:flex')}
      {buildCell('Paid', 'font-semibold hidden lg:flex')}
      {buildCell('Delivered', 'font-semibold hidden lg:flex')}
      {buildCell('Actions', 'font-semibold')}
    </div>
  );
};

const buildCell = (value, extraStyles = '') => {
  return (
    <div
      className={`border border-gray-400 w-4/12 lg:w-2/12 px-4 py-2 h-full flex items-center justify-center ${extraStyles}`}
    >
      {value}
    </div>
  );
};

export default UserProfileOrders;
