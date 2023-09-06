import React, { useState } from 'react'

export const CartContext = React.createContext({
	addedMeals: [],
	totalAmount: 0,
	onAddMeal: () => {},
})

export const CartProvider = ({ children }) => {
	const [addedMeals, setAddedMeals] = useState([])

	const addMealHandler = (newMeal) => {
		const currentIndex = addedMeals.findIndex((m) => m.id === newMeal.id)
		if (currentIndex === -1) {
			return setAddedMeals([...addedMeals, newMeal])
		}
		const newMeals = addedMeals.map((meal) => {
			if (meal.id === newMeal.id) {
				return {
					...meal,
					amount: meal.amount + newMeal.amount,
				}
			}
			return meal
		})
		setAddedMeals(newMeals)
	}

	return (
		<CartContext.Provider
			value={{
				addedMeals,
				onAddMeal: addMealHandler,
				totalAmount: 0,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
