import { Fragment } from 'react';
import AvaiableMeals from './AvaiableMeals';
import MealsSummary from './MealsSummary';

const Meals = () => {
	return (
		<Fragment>
			<MealsSummary />
			<AvaiableMeals />
		</Fragment>
	);
};
export default Meals;
