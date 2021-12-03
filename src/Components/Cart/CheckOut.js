import React, { useState } from 'react';
import classes from './CheckOut.module.css';
import useInput from '../Hook/use-input';

const isEmpty = (value) => value.trim().length > 5;
const isPhone = (value) => value.trim().length > 8;

const CheckOut = (props) => {
  const [descriptionValue, setIsDescription] = useState('');
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isEmpty);

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    valueBlurHandler: addressBlurHandler,
    reset: addressReset,
  } = useInput(isEmpty);

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    valueBlurHandler: phoneBlurHandler,
    reset: phoneReset,
  } = useInput(isPhone);

  let validForm = false;

  if (nameIsValid && phoneIsValid && addressIsValid) {
    validForm = true;
  }

  const onChangeDescription = (event) => {
    setIsDescription(event.target.value);
  };

  const onSubmitCheckOut = (event) => {
    event.preventDefault();
    if (!validForm) {
      return;
    }

    const userData = {
      name: nameValue,
      phone: phoneValue,
      address: addressValue,
      description: descriptionValue,
    };

    props.onSubmitOrder(userData);
    nameReset();
    phoneReset();
    addressReset();
  };

  return (
    <form onSubmit={onSubmitCheckOut} className={classes.form}>
      <div
        className={`${classes.control} ${nameHasError ? classes.invalid : ''}`}
      >
        <label htmlFor="name">Your Name </label>
        <input
          id="name"
          type="text"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameValue}
        />
        {nameHasError && <p className={classes.invalid}>Required</p>}
      </div>
      <div
        className={`${classes.control} ${phoneHasError ? classes.invalid : ''}`}
      >
        <label htmlFor="phone">Your Phone</label>
        <input
          id="phone"
          type="text"
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler}
          value={phoneValue}
        />
        {phoneHasError && <p className={classes.invalid}>Required</p>}
      </div>
      <div
        className={`${classes.control} ${
          addressHasError ? classes.invalid : ''
        }`}
      >
        <label htmlFor="address">Received Address</label>
        <input
          id="address"
          type="text"
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          value={addressValue}
        />
        {addressHasError && <p className={classes.invalid}>Required</p>}
      </div>

      <div className={classes.control}>
        <label htmlFor="description">Description </label>
        <textarea
          value={descriptionValue}
          onChange={onChangeDescription}
          id="description"
        />
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClick}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
