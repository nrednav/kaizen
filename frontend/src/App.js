import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';

const App = () => {
  return (
    <div className='h-screen flex flex-col justify-between'>
      <Header />
      <main className='mb-auto'>
        {/* <div className='container mx-auto flex justify-center'>
          <h1 className='py-4 text-4xl'>WELCOME TO KAIZEN</h1>
        </div> */}
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
