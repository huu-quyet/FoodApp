import React from 'react';
import ReactDom from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const Overlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const modalEl = document.getElementById('overlay');

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(<Backdrop onClick={props.onClick} />, modalEl)}{' '}
      {ReactDom.createPortal(<Overlay>{props.children}</Overlay>, modalEl)}
    </React.Fragment>
  );
};

export default Modal;
