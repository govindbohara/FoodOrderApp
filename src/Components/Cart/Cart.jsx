import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/Cart-Context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmit, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmitting] = useState();
	const cartCtx = useContext(CartContext);
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;
	const RemoveCartHandler = id => {
		cartCtx.removeItem(id);
	};
	const AddCartHandler = item => {
		cartCtx.addItem(item);
	};
	const orderHandler = () => {
		setIsCheckout(true);
	};
	console.log(cartCtx);
	const submithandler = async userData => {
		setIsSubmitting(true);
		await fetch('https://foodorder-72794-default-rtdb.firebaseio.com/orders.json', {
			method: 'POST',
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items,
			}),
		});
		setIsSubmitting(false);
		setDidSubmitting(true);
		window.location.reload(true);
	};
	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item, index) => (
				<CartItem
					key={index}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={RemoveCartHandler.bind(null, item.id)}
					onAdd={AddCartHandler.bind(null, item)}
				/>
			))}
		</ul>
	);
	const modalActions = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.hideCart}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);
	const cartModalContent = (
		<>
			{cartItems}
			<div className={classes.total}>
				<span>Total:</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && <Checkout onConfirm={submithandler} onCancel={props.hideCart} />}
			{!isCheckout && modalActions}
		</>
	);
	const didSubmitContent = (
		<>
			<p>Your order has been placed.</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.hideCart}>
					Close
				</button>
			</div>
		</>
	);
	const isSubmittingContent = <p>Your order is being sent.... </p>;

	return (
		<Modal onClose={props.hideCart}>
			{!isSubmit && !didSubmit && cartModalContent}
			{isSubmit && isSubmittingContent}
			{didSubmit && !isSubmit && didSubmitContent}
		</Modal>
	);
};
export default Cart;
