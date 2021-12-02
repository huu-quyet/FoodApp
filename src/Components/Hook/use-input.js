import { useReducer } from 'react';

const defaultInput = {
  value: '',
  isTouched: false,
};

const useReducerInput = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: false };
  }

  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }

  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }
  return defaultInput;
};

const useInput = (condition) => {
  const [validInput, dispatch] = useReducer(useReducerInput, defaultInput);
  const isValid = condition(validInput.value);
  const hasError = !isValid && validInput.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const valueBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: validInput.value,
    isValid: isValid,
    hasError: hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
