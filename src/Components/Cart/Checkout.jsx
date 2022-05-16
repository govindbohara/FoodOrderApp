import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = props => {
	const [formValidity, setFormValidity] = useState({
		name: true,
		street: true,
		postalCode: true,
		city: true,
	});
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = event => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredstreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

		setFormValidity({
			name: enteredNameIsValid,
			street: enteredstreetIsValid,
			postalCode: enteredPostalCodeIsValid,
			city: enteredCityIsValid,
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredCityIsValid &&
			enteredPostalCodeIsValid &&
			enteredstreetIsValid;

		if (!formIsValid) {
			return;
		}
		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			postalCode: enteredPostalCode,
			city: enteredCity,
		});
	};

	const nameControlClasses = `${classes.control} ${
		formValidity.name ? '' : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		formValidity.street ? '' : classes.invalid
	}`;

	const postalCodeControlClasses = `${classes.control} ${
		formValidity.postalCode ? '' : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		formValidity.city ? '' : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formValidity.name && <p>Please enter a name.</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!formValidity.street && <p>Please enter a street name.</p>}
			</div>
			<div className={postalCodeControlClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeInputRef} />
				{!formValidity.postalCode && <p>Please enter a postal code (5 Chars).</p>}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!formValidity.city && <p>Please enter a city name.</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
