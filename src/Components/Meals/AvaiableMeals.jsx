import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvaiableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvaiableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();
	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				'https://foodorder-72794-default-rtdb.firebaseio.com/meals.json'
			);

			if (!response.ok) {
				throw new Error('Something Went Wrong!!!');
			}

			const data = await response.json();
			setMeals(Object.values(data));
			setIsLoading(false);
		};

		fetchMeals().catch(error => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={classes.loading}>
				<h1>Loading....</h1>
			</section>
		);
	}
	if (httpError) {
		return (
			<section className={classes.error}>
				<h1>{httpError}</h1>
			</section>
		);
	}
	const mealList = meals.map((meal, index) => (
		<MealItem
			key={index}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealList}</ul>
			</Card>
		</section>
	);
};
export default AvaiableMeals;
