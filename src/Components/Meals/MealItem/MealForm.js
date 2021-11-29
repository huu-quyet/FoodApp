import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealForm.module.css';

const MealForm = (props) => {
  const [isValid, setIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enterAmount = amountInputRef.current.value;
    const enterAmountNumber = +enterAmount;

    if (enterAmount.trim().length === 0 || enterAmountNumber < 1) {
      setIsValid(false);
      return;
    } else {
      setIsValid(true);

      props.addToCart(enterAmountNumber);
    }
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        id={props.id}
        type="number"
        defaultValue="1"
        min="1"
        step="1"
      />
      <button onClick={submitHandler}>+ Add</button>
      {!isValid && <p>Please enter valid amount (amount gather than 1).</p>}
    </form>
  );
};

export default MealForm;
