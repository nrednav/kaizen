import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './screens/Home';
import ViewProduct from './screens/ViewProduct';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import UserProfile from './screens/UserProfile/UserProfile';

const App = () => {
  return (
    <Router>
      <div className='min-h-screen flex flex-col justify-between bg-gray-200'>
        <Header />
        <main className='mb-auto'>
          <Route path='/' component={Home} exact />
          <Route path='/products/:id' component={ViewProduct} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={UserProfile} />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
