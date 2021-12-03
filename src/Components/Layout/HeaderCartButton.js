import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);
  const [btnAnimation, setBtnAnimation] = useState(false);
  const numberCartItem = cartContext.item.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);
  const classesBtn = `${styles.button} ${btnAnimation ? styles.bump : ''}`;
  const { item } = cartContext;
  useEffect(() => {
    if (item !== undefined && item.length > 0) {
      setBtnAnimation(true);
    }

    const timer = setTimeout(() => {
      setBtnAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [item]);

  return (
    <React.Fragment>
      <button className={classesBtn} onClick={props.onClick}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberCartItem}</span>
      </button>
    </React.Fragment>
  );
};

export default HeaderCartButton;
