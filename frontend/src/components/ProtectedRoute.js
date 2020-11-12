import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  const { profile } = user;
  const { path } = rest;

  return (
    <Route
      {...rest}
      render={(props) =>
        profile ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/login?redirect=${path.slice(1)}`} />
        )
      }
    />
  );
};

export default ProtectedRoute;
