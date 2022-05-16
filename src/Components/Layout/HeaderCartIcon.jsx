import CartIcon from '../Cart/CartIcon'
import { useContext } from 'react'
import classes from './HeaderCartIcon.module.css'
import CartContext from '../../store/Cart-Context'

const HeaderCartIcon = props => {
	const cartctx = useContext(CartContext)

	const noOfCartItems = cartctx.items.reduce((currVal, item) => {
		return currVal + item.amount
	}, 0)
	// console.log(noOfCartItems);
	return (
		<button className={classes.button} onClick={props.showCart}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{noOfCartItems}</span>
		</button>
	)
}
export default HeaderCartIcon
