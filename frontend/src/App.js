import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './screens/Home';
import ViewProduct from './screens/ViewProduct';
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
import CreateProduct from './screens/CreateProduct';
import EditProduct from './screens/EditProduct';

const App = () => {
  const user = useSelector((state) => state.user);
  const { profile } = user;

  return (
    <Router>
      <div className='min-h-screen flex flex-col justify-between bg-gray-200'>
        <Header />
        <main className='mb-auto'>
          <Route path='/' component={Home} exact />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <ProtectedRoute
            path='/profile'
            component={profile && profile.isAdmin ? AdminProfile : UserProfile}
          />
          <ProtectedRoute path='/shipping' component={Shipping} />
          <ProtectedRoute path='/payment' component={Payment} />
          <ProtectedRoute path='/order' component={OrderPlacement} />
          <ProtectedRoute path='/orders/:id' component={ViewOrder} />
          <Switch>
            <ProtectedRoute path='/products/create' component={CreateProduct} />
            <ProtectedRoute path='/products/:id/edit' component={EditProduct} />
            <Route path='/products/:id' component={ViewProduct} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
