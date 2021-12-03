import React, { useReducer } from 'react';

const CartContext = React.createContext({
  item: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

const defaultCart = {
  item: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.item[existingCartItemIndex];
    let updateItems;

    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updateItems = [...state.item];
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems = state.item.concat(action.item);
    }

    return { item: updateItems, totalAmount: newTotalAmount };
  }

  if (action.type === 'REMOVE') {
    if (action.id.amount === 0) {
      return defaultCart;
    }
    const newTotalAmount = state.totalAmount - action.id.price * 1;
    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.id.id
    );
    const existingCartItem = state.item[existingCartItemIndex];
    let updateItems;

    if (existingCartItem) {
      console.log(existingCartItem);
      console.log(action);
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };

      updateItems = [...state.item];
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems = state.item.concat(action.id);
    }
    return { item: updateItems, totalAmount: newTotalAmount };
  }

  if (action.type === 'CLEAR') {
    return defaultCart;
  }

  return defaultCart;
};

export const CartContextProvider = (props) => {
  const [cartItem, dispatchCartItem] = useReducer(cartReducer, defaultCart);

  const addItemHandler = (item) => {
    dispatchCartItem({ type: 'ADD', item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartItem({ type: 'REMOVE', id: id });
  };

  const clearItemHandler = () => {
    dispatchCartItem({ type: 'CLEAR' });
  };

  const cartItems = {
    item: cartItem.item,
    totalAmount: cartItem.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearItemHandler,
  };
  return (
    <CartContext.Provider value={cartItems}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
