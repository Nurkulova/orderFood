import React, { useReducer, useState } from "react";

export const CartContext = React.createContext({
  addedMeals: [],
  totalAmount: 0,
  onAddMeal: () => {},
  oniIncreaseMealAmount: () => {},
});

const ADD_MEAL_TYPE = "ADD_MEAL";
const INCREASE_MEAL_AMOUNT_TYPE = "INCREASE_AMOUNT";
const DECREASE_MEAL_AMOUNT_TYPE = "DECREASE_AMOUNT";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_MEAL_TYPE: {
      const prevMeals = state.addedMeals;
      const newMeal = action.payload;

      if (prevMeals.length === 0) {
        return {
          ...state,
          addedMeals: [newMeal],
        };
      }
      const isMealExists = prevMeals.find((meal) => meal.id === newMeal.id);
      if (isMealExists === undefined) {
        return {
          ...state,
          addedMeals: [...prevMeals, newMeal],
        };
      }

      const newAddedMeals = prevMeals.map((meal) => {
        if (meal.id === newMeal.id) {
          return { ...meal, amount: meal.amount + newMeal.amount };
        }
        return meal;
      });

      return {
        ...state,
        addedMeals: newAddedMeals,
      };
    }

    case INCREASE_MEAL_AMOUNT_TYPE: {
      const prevMeals = state.addedMeals;
      const mealId = action.payload;
      const newAddedMeals = prevMeals.map((meal) => {
        if (meal.id === mealId) {
          return { ...meal, amount: meal.amount + 1 };
        }
        return meal;
      });

      return {
        ...state,
        addedMeals: newAddedMeals,
      };
    }

    case DECREASE_MEAL_AMOUNT_TYPE: {
      const prevMeals = state.addedMeals;
      const mealId = action.payload;
      const currentMealItem = prevMeals.find((meal) => meal.id === mealId);
      if (currentMealItem.amount === 1) {
        return {
          ...state,
          addedMeals: prevMeals.filter(
            (meal) => meal.id !== currentMealItem.id
          ),
        };
      }
      const newAddedMeals = prevMeals.map((meal) => {
        if (meal.id === mealId) {
          return { ...meal, amount: meal.amount - 1 };
        }
        return meal;
      });

      return {
        ...state,
        addedMeals: newAddedMeals,
      };
    }
    default: {
      return state;
    }
  }
};
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, { addedMeals: [] });
  const { addedMeals } = cartState;

  const totalAmount = addedMeals.reduce((acc, meal) => {
    return acc + meal.price * meal.amount;
  }, 0);

  const addMealHandler = (newMeal) => {
    dispatch({ type: ADD_MEAL_TYPE, payload: newMeal });
  };
  const increaseMealAmountHandler = (id) => {
    // console.log(id);
    dispatch({ type: INCREASE_MEAL_AMOUNT_TYPE, payload: id });
  };
  const decreaseMealAmountHandler = (id) => {
    // console.log(id);
    dispatch({ type: DECREASE_MEAL_AMOUNT_TYPE, payload: id });
  };

  return (
    <CartContext.Provider
      value={{
        addedMeals,
        onAddMeal: addMealHandler,
        totalAmount,
        onIncreaseMealAmount: increaseMealAmountHandler,
        onDecreaseMealAmount: decreaseMealAmountHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
