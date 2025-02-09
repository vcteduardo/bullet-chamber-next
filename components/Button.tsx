'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface CustomButtonProps extends Omit<MuiButtonProps, 'variant'> {
  customVariant?: 'primary' | 'secondary';
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'customVariant',
})<CustomButtonProps>(({ theme, size = 'medium', customVariant = 'primary' }) => ({
  textTransform: 'none',
  borderRadius: 168,
  width: size === 'large' ? 200 : 'auto',
  height: size === 'large' ? 52 : 'auto',
  padding: size === 'large' 
    ? '12.6px 40px'
    : size === 'small' 
    ? '8px 16px' 
    : '12.6px 33.6px',
  fontSize: size === 'large' ? 16 : size === 'small' ? 14 : 15,
  fontWeight: 500,
  gap: 8,
  whiteSpace: 'nowrap',
  transition: theme.transitions.create(['transform', 'box-shadow', 'background'], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeInOut,
  }),

  ...(customVariant === 'primary' && {
    background: 'linear-gradient(45deg, #6A26CD 0%, #8342F1 35%, #8342F1 70%, #5977FF 100%)',
    color: 'white',
    boxShadow: `0px 4px 8px -4px ${alpha('#8342F1', 0.3)}, 0px 8px 16px -8px ${alpha('#8342F1', 0.6)}`,

    '&:hover': {
      background: 'linear-gradient(45deg, #6A26CD 0%, #8342F1 35%, #8342F1 70%, #5977FF 100%)',
      transform: 'translateY(-1px)',
      boxShadow: `0px 8px 16px -4px ${alpha('#8342F1', 0.3)}, 0px 12px 24px -8px ${alpha('#8342F1', 0.6)}`,
    },

    '&:active': {
      transform: 'translateY(0)',
      boxShadow: `0px 4px 8px -4px ${alpha('#8342F1', 0.3)}, 0px 8px 16px -8px ${alpha('#8342F1', 0.6)}`,
    },
  }),

  ...(customVariant === 'secondary' && {
    background: alpha('#8342F1', 0.04),
    color: '#8342F1',
    boxShadow: 'none',

    '&:hover': {
      background: alpha('#8342F1', 0.08),
      transform: 'translateY(-1px)',
    },

    '&:active': {
      background: alpha('#8342F1', 0.12),
      transform: 'translateY(0)',
    },
  }),

  '&.Mui-disabled': {
    background: theme.palette.grey[300],
    color: theme.palette.grey[500],
    boxShadow: 'none',
  },
}));

const Button = ({ children, customVariant = 'primary', size = 'medium', ...props }: CustomButtonProps) => {
  return (
    <StyledButton 
      variant="contained" 
      customVariant={customVariant}
      size={size}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 