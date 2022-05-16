import React, { useEffect, useState } from 'react'
import CartContext from './Cart-Context'

const CartProvider = ({ children }) => {
	const [items, setItems] = useState([])
	const [totalAmount, setTotalAmount] = useState(0)

	useEffect(() => {
		const total = items.reduce((prev, curr) => prev + curr.price * curr.amount, 0)
		setTotalAmount(total)
	}, [items])

	const addItem = item =>
		setItems(stateItems => {
			// check if items contains the id of the new item to be added
			if (stateItems.find(currItem => currItem.id === item.id)) {
				// if item already exist in the cart, simply increase the item amount
				const updatedItems = stateItems.map(currItem =>
					currItem.id === item.id
						? {
								...currItem,
								amount: currItem.amount + 1,
						  }
						: currItem
				)
				setItems(updatedItems)
			} else {
				setItems([item, ...stateItems])
			}
		})

	const removeItem = id => {
		const foundItem = items.find(item => item.id === id)
		// if item quantity is greater than 1, decrease the item amount
		if (foundItem && foundItem.amount > 1) {
			setItems(
				items.map(item =>
					item.id === id ? { ...item, amount: item.amount - 1 } : item
				)
			)
		} else {
			//else simply remove the item
			setItems(items.filter(item => item.id !== id))
		}
	}
	const value = {
		items,
		addItem,
		removeItem,
		totalAmount,
	}
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
