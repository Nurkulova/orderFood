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

// import React, { useReducer } from 'react';

// const cartReducer = (state, action) => {
// 	switch (action.type) {
// 	  case 'ADD_MEAL':
// 		const existingMealIndex = state.addedMeals.findIndex(
// 		  (meal) => meal.id === action.meal.id
// 		);
  
// 		let updatedMeals;
// 		if (existingMealIndex === -1) {
// 		  updatedMeals = state.addedMeals.concat(action.meal);
// 		} else {
// 		  const updatedMeal = {
// 			...state.addedMeals[existingMealIndex],
// 			amount: state.addedMeals[existingMealIndex].amount + action.meal.amount,
// 		  };
// 		  updatedMeals = [...state.addedMeals];
// 		  updatedMeals[existingMealIndex] = updatedMeal;
// 		}
  
// 		const updatedTotalAmount = updatedMeals.reduce(
// 		  (total, meal) => total + meal.price * meal.amount,
// 		  0
// 		);
  
// 		return {
// 		  addedMeals: updatedMeals,
// 		  totalAmount: updatedTotalAmount,
// 		};
  
// 	  case 'REMOVE_MEAL':
// 		const filteredMeals = state.addedMeals.filter(
// 		  (meal) => meal.id !== action.mealId
// 		);
  
// 		const updatedTotal = filteredMeals.reduce(
// 		  (total, meal) => total + meal.price * meal.amount,
// 		  0
// 		);
  
// 		return {
// 		  addedMeals: filteredMeals,
// 		  totalAmount: updatedTotal,
// 		};
  
// 	  default:
// 		return state;
// 	}
//   };
//   export const CartContext = React.createContext();

// export const CartProvider = ({ children }) => {
// 	const [cartState, dispatchCartAction] = useReducer(cartReducer, {
// 		addedMeals: [],
// 		totalAmount: 0,
// 	  });
// 	  const addMealHandler = (newMeal) => {
// 		dispatchCartAction({ type: 'ADD_MEAL', meal: newMeal });
// 	  };
	
// 	  const removeMealHandler = (mealId) => {
// 		dispatchCartAction({ type: 'REMOVE_MEAL', mealId });
// 	  };

// 	return (
// 		<CartContext.Provider
// 			value={{
// 				addedMeals: cartState.addedMeals,
// 				totalAmount: cartState.totalAmount,
// 				onAddMeal: addMealHandler,
// 				onRemoveMeal: removeMealHandler,
// 			}}
// 		>
// 			{children}
// 		</CartContext.Provider>
// 	)
// }