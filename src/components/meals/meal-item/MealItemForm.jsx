import React, { useReducer } from 'react'
import { styled } from 'styled-components'
import { Button } from '../../UI/Button'
import { PlusIcon } from '../../../assets'


const amountReducer = (state, action) => {
	switch (action.type) {
	  case 'CHANGE':
		return { enteredAmount: Number(action.value) };
	  case 'RESET':
		return { enteredAmount: 1 };
	  default:
		return state;
	}
  };

export const MealItemForm = ({ inputId, onAddMeal }) => {
	const [amountState, dispatchAmount] = useReducer(amountReducer, {
		enteredAmount: 1,
	  });
	const amountChangeHnadler = (e) => {
		dispatchAmount({ type: 'CHANGE', value: e.target.value });	}

	const submitHandler = (e) => {
		e.preventDefault()
		onAddMeal(amountState.enteredAmount)
		dispatchAmount({ type: 'RESET' });	}

	return (
		<FormContainer onSubmit={submitHandler}>
			<InputWrapper>
				<label htmlFor={inputId}>Amount</label>
				<input
					type='number'
					id={inputId}
					min='1'
					max='5'
					value={amountState.enteredAmount}
					onChange={amountChangeHnadler}
				/>
			</InputWrapper>
			<Button IconComponent={PlusIcon} size='small'>
				Add
			</Button>
		</FormContainer>
	)
}

const FormContainer = styled('form')`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
	gap: 12px;
`

const InputWrapper = styled('div')`
	display: flex;
	align-items: center;
	gap: 20px;
	label {
		font-size: 18px;
		color: #222222;
		font-weight: 600;
	}
	input {
		border: 1px solid #d6d6d6;
		border-radius: 6px;
		max-width: 60px;
		width: 100%;
		height: 32px;
		outline: none;
		padding: 4px 12px;
		font-size: 1rem;
		font-weight: 600;
		font-family: inherit;
	}
`
