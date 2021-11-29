import React from 'react';
import styles from './Header.module.css';
import mealImage from '../../img/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h2>ReactMeals</h2>
        <HeaderCartButton onClick={props.onShowCar}></HeaderCartButton>
      </header>
      <div>
        <div className={styles['main-image']}>
          <img src={mealImage} alt="A meal table"></img>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
