import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
	const [amountIsValid, setamountIsValid] = useState(true);
	const amountInputRef = useRef();
	const submithandler = event => {
		event.preventDefault();
		const enteredAmount = amountInputRef.current.value;
		console.log(enteredAmount);
		const enteredAmountNumber = +enteredAmount;
		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 5
		) {
			setamountIsValid(false);
			return;
		}
		props.onAddToCart(enteredAmountNumber);
	};

	return (
		<form className={classes.form} onSubmit={submithandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: 'Amount',
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button>+Add</button>
			{!amountIsValid && <p>Set amount to (1-5)</p>}
		</form>
	);
};
export default MealItemForm;
