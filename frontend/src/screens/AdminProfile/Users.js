import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, fetchUsers, updateUser } from '../../actions/admin';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import Switch from 'react-switch';

const Users = () => {
  const dispatch = useDispatch();

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

  const [activeComponent, setActiveComponent] = useState('UserList');
  const [selectedUser, setSelectedUser] = useState({});

  const content = {
    UserList: (
      <UserListComponent
        users={userList}
        setActiveComponent={setActiveComponent}
        setSelectedUser={setSelectedUser}
      />
    ),
    EditUser: (
      <EditUserComponent
        user={selectedUser}
        setActiveComponent={setActiveComponent}
      ></EditUserComponent>
    ),
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
        <>{content[activeComponent]}</>
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
      {buildCell('Actions', 'font-semibold lg:w-3/12')}
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

const UserListComponent = ({ users, setActiveComponent, setSelectedUser }) => {
  const dispatch = useDispatch();

  const deleteUserHandler = (id, name) => {
    if (window.confirm(`Are you sure you wish to remove user: ${name}?`)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      {users && users.length === 0 && (
        <div className='flex justify-start py-4'>
          <h1>No users found...</h1>
        </div>
      )}
      {users && users.length > 0 && (
        <div className='flex flex-col'>
          {buildHeaderRow()}
          {users.map((user) => (
            <div
              key={user._id}
              className='flex flex-row justify-start h-16 bg-gray-300 hover:bg-gray-100'
            >
              {buildCell(<p className='truncate'>{user._id}</p>, 'lg:w-3/12')}
              {buildCell(<p className='truncate'>{user.name}</p>, 'lg:w-3/12')}
              {buildCell(
                <p className='truncate'>{user.email}</p>,
                'hidden lg:flex lg:w-3/12'
              )}
              {buildCell(
                <div className='h-full w-full flex items-center justify-center'>
                  <button
                    className='mx-2'
                    onClick={() => {
                      setSelectedUser(user);
                      setActiveComponent('EditUser');
                    }}
                    title='Edit'
                  >
                    <i className='ri-pencil-fill text-2xl'></i>
                  </button>
                  <button
                    className='mx-2'
                    onClick={() => deleteUserHandler(user._id, user.name)}
                    title='Remove'
                  >
                    <i className='ri-delete-bin-fill text-red-700 text-2xl'></i>
                  </button>
                </div>,
                'justify-center lg:w-3/12'
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const EditUserComponent = ({ user, setActiveComponent }) => {
  const dispatch = useDispatch();

  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const makeAdmin = () => {
    setIsAdmin(!isAdmin);
    user.isAdmin = !isAdmin;
    dispatch(updateUser(user));
  };

  return (
    <div className='flex flex-col'>
      <button
        className='bg-transparent font-semibold uppercase hover:opacity-75  outline-none self-end'
        onClick={() => setActiveComponent('UserList')}
      >
        <div className='flex flex-row justify-evenly items-center'>
          <i className='ri-arrow-left-line'></i>
          <p className='pl-2'>Back</p>
        </div>
      </button>
      <div className='flex flex-col items-start'>
        <div className='flex flex-row items-center mt-4'>
          <p>Admin Access:</p>
          <Switch
            onChange={makeAdmin}
            checked={isAdmin}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor='#48bb78'
            height={20}
            handleDiameter={16}
            width={40}
            className='px-4'
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
