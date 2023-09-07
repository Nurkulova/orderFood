import React from 'react';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ variant, size, hasIcon }) => ({
  borderRadius: '20px',
  fontWeight: 500,
  fontSize: BUTTON_SIZES[size || 'medium'],
  ...(variant === 'outlined' && {
    backgroundColor: 'transparent',
    color: '#8a2b06',
    '&:hover': {
      backgroundColor: '#8a2b06',
      color: '#fff',
    },
    '&:active': {
      backgroundColor: '#993108',
    },
    '&:disabled': {
      backgroundColor: 'transparent',
      color: '#cac6c4',
    },
  }),
  ...(variant === 'contained' && {
    backgroundColor: '#8a2b06',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#7e2a0a',
    },
    '&:active': {
      backgroundColor: '#993108',
    },
    '&:disabled': {
      backgroundColor: '#cac6c4',
    },
  }),
  '&:focus': {
    outline: 'none',
  },
  '&:disabled': {
    cursor: 'not-allowed',
    border: '1px solid #cac6c4',
  },
  transition: 'all 0.1s ease-out',
  display: hasIcon ? 'flex' : 'inline-flex',
  alignItems: 'center',
  gap: hasIcon ? '10px' : '0',
  fontWeight: hasIcon ? '700' : '500',
}));

const BUTTON_SIZES = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

const MaterialUIButton = ({
  children,
  onClick,
  disabled,
  variant = 'contained',
  size = 'medium',
  IconComponent = null,
  type = 'submit',
  ...restProps
}) => {
  const hasIcon = Boolean(IconComponent);

  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      hasIcon={hasIcon}
      {...restProps}
    >
      {hasIcon ? (
        <IconButton color="#ffff" size="small">
          <IconComponent />
        </IconButton>
      ) : null}
      {children}
    </StyledButton>
  );
};

export default MaterialUIButton;
