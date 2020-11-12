import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Switch, useLocation } from 'react-router-dom';
import { FadeTransition } from './FadeTransition';
import ProtectedRoute from '../components/ProtectedRoute';

export const RouteTransition = ({
  component: Component,
  protect = false,
  ...rest
}) => {
  return protect ? (
    <ProtectedRoute
      path={rest.path}
      component={(props) => (
        <FadeTransition>
          <Component {...props} />
        </FadeTransition>
      )}
    />
  ) : (
    <Route
      {...rest}
      render={(props) => (
        <FadeTransition>
          <Component {...props} />
        </FadeTransition>
      )}
    />
  );
};

export const AnimatedRoutes = ({
  children,
  exitBeforeEnter = true,
  initial = false,
}) => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter={exitBeforeEnter} initial={initial}>
      <Switch location={location}>{children}</Switch>
    </AnimatePresence>
  );
};
