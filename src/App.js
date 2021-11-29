import React, { useState } from 'react';
import Cart from './Components/Cart/Cart';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import { CartContextProvider } from './store/cart-context';

function App() {
  const [showCar, setShowCar] = useState(false);

  const showCarHandler = () => {
    setShowCar(true);
  };

  const hideCarHandler = () => {
    setShowCar(false);
  };
  return (
    <CartContextProvider>
      {showCar && <Cart onHideCar={hideCarHandler} />}
      <Header onShowCar={showCarHandler}></Header>
      <Meals />
    </CartContextProvider>
  );
}

export default App;
