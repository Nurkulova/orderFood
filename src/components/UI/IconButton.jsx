import React from 'react'
import MaterialUIButton from './MaterialUIButton'
import { styled } from 'styled-components'

export const IconButton = ({ Icon, onClick, type = 'button', disabled }) => {
	return (
		<StyledButton
			onClick={onClick}
			type={type}
			variant='outlined'
			disabled={disabled}
		>
			{Icon ? <Icon /> : null}
		</StyledButton>
	)
}

const StyledButton = styled(MaterialUIButton)`
	border-radius: 6px;
	padding: 0.5rem 0.875rem;
	display: grid;
	place-items: center;
	&:hover svg,
	&:hover path {
		fill: white;
		stroke: white;
	}
`


