import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import ViewProduct from './screens/ViewProduct';

const App = () => {
  return (
    <Router>
      <div className='min-h-screen flex flex-col justify-between bg-gray-200'>
        <Header />
        <main className='mb-auto'>
          <Route path='/' component={Home} exact />
          <Route path='/product/:id' component={ViewProduct} />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
