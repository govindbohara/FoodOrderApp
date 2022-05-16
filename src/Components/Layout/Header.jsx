import React from 'react';
import mealImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartIcon from './HeaderCartIcon';

const Header = props => {
	return (
		<React.Fragment>
			<header className={classes.header}>
				<h1>React Meals</h1>
				<HeaderCartIcon showCart={props.showCart} />
			</header>
			<div className={classes['main-image']}>
				<img src={mealImage} alt="meal" />
			</div>
		</React.Fragment>
	);
};

export default Header;
