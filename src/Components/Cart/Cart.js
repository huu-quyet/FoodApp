import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CheckOut from './CheckOut';

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
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

  return (
    <Modal className={classes.total} onClick={props.onHideCar}>
      <div>
        {cartItem}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      </div>
      {isCheckOut && <CheckOut onClick={props.onHideCar} />}
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
    </Modal>
  );
};
export default Cart;
