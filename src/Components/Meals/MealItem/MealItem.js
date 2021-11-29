import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import MealForm from './MealForm';
import classes from './MealItem.module.css';

const MealsItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const addToCarHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <div className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <MealForm addToCart={addToCarHandler} />
    </div>
  );
};

export default MealsItem;
