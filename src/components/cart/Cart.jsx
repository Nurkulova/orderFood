import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '../UI/Modal'
import { CartItem } from './CartItem'
import { styled } from 'styled-components'
import { TotalAmount } from './TotalAmount'
import MaterialUIButton from '../UI/MaterialUIButton'; 
import { CartContext } from '../../store/cart-context'


const fetchCartMeals = async () =>{
			try {
				const response = await fetch (' http://ec2-3-76-44-71.eu-central-1.compute.amazonaws.com:5500/api/v1/basket'
				, {
					headers:{
						UserId:'Cholpon',
					}
				})
				const result = await  response.json()
				console.log(result.data);
			} catch (error) {
				console.log(error);
			}
		}
		// fetchCartMeals()
export const Cart = ({ onClose }) => {
	// const { addedMeals } = useContext(CartContext)

	const [cartMeals,setCartMeals] = useState([])

	useEffect(()=>{
		fetchCartMeals()
		.then((data) => {
		  if (data && data.items) {
			setCartMeals(data.items);
		  }
		})
		.catch((error) => {
		  console.log(error);
		});
		
	},[])

	const increaseAmountHandler = async (id,amount) =>{
		try {
			const response = await fetch(`http://ec2-3-76-44-71.eu-central-1.compute.amazonaws.com:5500/api/v1/basketItem/${id}/update`,
			{
				method:'PUT',
				headers:{
					UserId:'Cholpon',
					'Content-Type':	'application/json',	
				},
				body: JSON.stringify({ amount :amount+1})
			}
			)
			const result = await response.json() 
			fetchCartMeals().then((data)=> setCartMeals(data.items))
		} catch (error) {
			console.log(error);
		}
	}
	const decreaseAmountHandler = async (id,amount) =>{
		if (amount === 1){
			try {
				const response = await fetch (`http://ec2-3-76-44-71.eu-central-1.compute.amazonaws.com:5500/api/v1/basketItem/${id}/delete`,
				{
					method:'DELETE',
					headers:{
						UserId:'Cholpon',
						'Content-Type':'application/json',
					}
				});
				const result = await response.json();
				fetchCartMeals().then((data)=> setCartMeals(data.items))
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const response = await fetch (`http://ec2-3-76-44-71.eu-central-1.compute.amazonaws.com:5500/api/v1/basketItem/${id}/update`,
				{
					method:"PUT",
					headers:{
						UserId:'Cholpon',
						'Content-Type':"application/json"
					},
					body:JSON.stringify({ amount :amount-1})
				})
				const result = await response.json();
				fetchCartMeals().then((data)=> setCartMeals(data.items))
			} catch (error) {
				console.log(error);
			}
		}
	}

	const totalAmount = cartMeals.reduce((acc,meal)=>{
		return acc + meal.price * meal.amount
	},0)

	return (
		<Modal onClose={onClose}>
			<Content>
				<CartList>
					{cartMeals.map((meal) => (
						<CartItem
							title={meal.title}
							amount={meal.amount}
							price={meal.price}
							key={meal._id}
							id={meal._id}
							onIncreaseMealAmount={increaseAmountHandler}
							onDecreaseMealAmount={decreaseAmountHandler}
						/>
					))}
				</CartList>
				<TotalAmount totalAmount={totalAmount} />
				<ActionsContainer>
					<MaterialUIButton variant='outlined' onClick={onClose}>
						Close
					</MaterialUIButton>
					<MaterialUIButton onClick={() => console.log('ORDER')}>Order</MaterialUIButton>
				</ActionsContainer>
			</Content>
		</Modal>
	)
}

const ActionsContainer = styled('div')`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 1rem;
	margin-top: 24px;
`

const Content = styled('div')`
	padding: 1.5rem 1rem;
`

const CartList = styled('ul')`
	list-style: none;
	display: flex;
	flex-direction: column;
	max-height: 360px;
	overflow-y: scroll;
`
