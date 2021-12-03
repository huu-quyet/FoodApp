import axios from 'axios';
import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CheckOut from './CheckOut';

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.item.length > 0;
  const removeHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onCheckOut = () => {
    setDidSubmit(false);
    setIsCheckOut(true);
  };
  const cartItem = (
    <ul className={classes['cart-items']}>
      {cartCtx.item.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={removeHandler.bind(null, item)}
            onAdd={addHandler.bind(null, item)}
          >
            {item.name}
          </CartItem>
        );
      })}
    </ul>
  );

  const onSubmitOrder = async (userData) => {
    await axios.post(
      'https://react-app-12e8f-default-rtdb.asia-southeast1.firebasedatabase.app/order.json',
      {
        user: userData,
        orderItems: cartCtx.item,
        totalAmount: cartCtx.totalAmount,
      }
    );

    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartModalItems = (
    <React.Fragment>
      <div>
        {cartItem}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      </div>
      {!isCheckOut && (
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onHideCar}>
            Close
          </button>
          {hasItem && (
            <button onClick={onCheckOut} className={classes['button']}>
              Open
            </button>
          )}
        </div>
      )}
      {isCheckOut && (
        <CheckOut onSubmitOrder={onSubmitOrder} onClick={props.onHideCar} />
      )}
    </React.Fragment>
  );

  const didSubmitHandler = (
    <React.Fragment>
      <p>Order successful! 🎉🎉🎉</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCar}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal className={classes.total} onClick={props.onHideCar}>
      {!didSubmit && cartModalItems}
      {didSubmit && didSubmitHandler}
    </Modal>
  );
};
export default Cart;
