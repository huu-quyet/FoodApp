import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './MealsList.module.css';

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const meals = await axios.get(
        'https://react-app-12e8f-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      );

      if (!meals.statusText === 'OK') {
        throw new Error('Something went wrong!');
      }

      const dataMeals = await meals.data;
      const loadMeals = [];

      for (const key in dataMeals) {
        loadMeals.push({
          id: dataMeals[key].id,
          name: dataMeals[key].name,
          description: dataMeals[key].description,
          price: dataMeals[key].price,
        });
      }
      setMeals(loadMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.error}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      >
        {meal.description}
      </MealItem>
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsList;
