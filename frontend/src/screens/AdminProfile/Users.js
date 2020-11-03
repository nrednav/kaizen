import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteUser, fetchUsers } from '../../actions/admin';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';

const Users = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const users = useSelector((state) => state.admin.users);
  const { list: userList, error: fetchUsersError, loading } = users;

  const deletedUser = useSelector((state) => state.admin.deletedUser);
  const {
    success: deleteUserSuccess,
    loading: deleteUserLoading,
  } = deletedUser;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, deleteUserSuccess]);

  const deleteUserHandler = (id, name) => {
    if (window.confirm(`Are you sure you wish to remove user: ${name}?`)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      {loading || deleteUserLoading ? (
        <Loader />
      ) : fetchUsersError ? (
        <div className='flex justify-center'>
          <Alert
            variant='error'
            message={fetchUsersError}
            className='w-1/2'
          ></Alert>
        </div>
      ) : (
        <>
          {userList && userList.length === 0 && (
            <div className='flex justify-start py-4'>
              <h1>No users found...</h1>
            </div>
          )}
          {userList && userList.length > 0 && (
            <div className='flex flex-col'>
              {buildHeaderRow()}
              {userList.map((user) => (
                <div
                  key={user._id}
                  className='flex flex-row justify-start h-16 bg-gray-300 hover:bg-gray-100'
                >
                  {buildCell(
                    <p className='truncate'>{user._id}</p>,
                    'lg:w-3/12'
                  )}
                  {buildCell(user.name, 'lg:w-3/12')}
                  {buildCell(
                    <p className='truncate'>{user.email}</p>,
                    'hidden lg:flex lg:w-3/12'
                  )}
                  {buildCell(
                    <i
                      className={`${
                        user.isAdmin
                          ? 'ri-check-line text-green-700'
                          : 'ri-close-line text-red-700'
                      } text-2xl`}
                    ></i>,
                    'hidden lg:flex lg:w-1/12'
                  )}
                  {buildCell(
                    <div className='h-full w-full flex items-center justify-center'>
                      <button
                        className='mx-2'
                        onClick={() => history.push(`/users/${user._id}/edit`)}
                      >
                        <i className='ri-pencil-fill text-2xl'></i>
                      </button>
                      <button
                        className='mx-2'
                        onClick={() => deleteUserHandler(user._id, user.name)}
                      >
                        <i className='ri-delete-bin-fill text-red-700 text-2xl'></i>
                      </button>
                    </div>,
                    'justify-center lg:w-2/12'
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const buildHeaderRow = () => {
  return (
    <div className='flex flex-row justify-start h-12'>
      {buildCell('ID', 'font-semibold lg:w-3/12')}
      {buildCell('Name', 'font-semibold lg:w-3/12')}
      {buildCell('Email', 'font-semibold hidden lg:flex lg:w-3/12')}
      {buildCell('Admin', 'font-semibold hidden lg:flex lg:w-1/12')}
      {buildCell('Actions', 'font-semibold lg:w-2/12')}
    </div>
  );
};

const buildCell = (value, extraStyles = '') => {
  return (
    <div
      className={`border border-gray-400 w-4/12 px-4 py-2 h-full flex items-center justify-center ${extraStyles}`}
    >
      {value}
    </div>
  );
};

export default Users;
