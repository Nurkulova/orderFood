import React, { useContext } from 'react'
import { styled } from 'styled-components'
import { MealItemForm } from './MealItemForm'

export const MealItem = ({ title, description, price, id }) => {
	const addMealToCartHandler = async (amount) => {
		try {
			const response = await fetch(`http://ec2-3-76-44-71.eu-central-1.compute.amazonaws.com:5500/api/v1/foods/${id}/addToBasket`,
			{
				method:'POST',
				headers:{
					UserId:'Cholpon',
					'Content-Type':	'application/json',			},
				body:JSON.stringify({amount}),
			},
			)	
			const result = await response.json()
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<ListItem>
			<Content>
				<b>{title}</b>
				<p>{description}</p>
				<span>${price}</span>
			</Content>
			<MealItemForm inputId={id} onAddMeal={addMealToCartHandler} />
		</ListItem>
	)
}

const ListItem = styled('li')`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 20px;
	&:not(:last-of-type) {
		border-bottom: 2px solid #d6d6d6;
	}
`

const Content = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 4px;
	b {
		font-size: 1.125rem;
		font-weight: 600;
	}
	p {
		font-style: italic;
		font-weight: 400;
		font-size: 16px;
	}
	span {
		font-weight: 700;
		font-size: 20px;
		color: #ad5502;
	}
`
