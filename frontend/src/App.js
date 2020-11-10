import React from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './screens/Home';
import ViewProduct from './screens/Product/ViewProduct';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import UserProfile from './screens/UserProfile/UserProfile';
import AdminProfile from './screens/AdminProfile/AdminProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Shipping from './screens/Shipping/Shipping';
import Payment from './screens/Payment/Payment';
import OrderPlacement from './screens/Order/OrderPlacement';
import ViewOrder from './screens/Order/ViewOrder';
import CreateProduct from './screens/Product/CreateProduct';
import EditProduct from './screens/Product/EditProduct';

import { AnimatedRoutes, RouteTransition } from './animations/animations';

const App = () => {
  const user = useSelector((state) => state.user);
  const { profile } = user;

  return (
    <div className='min-h-screen flex flex-col justify-between bg-gray-200'>
      <Header />
      <main className='mb-auto'>
        <AnimatedRoutes>
          <RouteTransition path='/' exact component={Home} />
          <RouteTransition path='/cart/:id?' component={Cart} />
          <RouteTransition path='/login' component={Login} />
          <RouteTransition path='/register' component={Register} />
          <ProtectedRoute
            protect={true}
            path='/profile'
            component={profile && profile.isAdmin ? AdminProfile : UserProfile}
          />
          <RouteTransition
            protect={true}
            path='/shipping'
            component={Shipping}
          />
          <RouteTransition protect={true} path='/payment' component={Payment} />
          <RouteTransition
            protect={true}
            path='/order'
            component={OrderPlacement}
          />
          <RouteTransition
            protect={true}
            path='/orders/:id'
            component={ViewOrder}
          />
          <Switch>
            <RouteTransition
              protect={true}
              path='/products/create'
              component={CreateProduct}
            />
            {profile && profile.isAdmin && (
              <RouteTransition
                protect={true}
                path='/products/:id/edit'
                component={EditProduct}
              />
            )}
            <RouteTransition path='/products/:id' component={ViewProduct} />
          </Switch>
        </AnimatedRoutes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
