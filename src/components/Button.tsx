"use client"

import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick, disabled }) => {
  const styles = variant === 'primary'
    ? {
        backgroundColor: '#22C55E',
        color: 'white',
        '&:hover': { backgroundColor: '#16A34A' },
      }
    : {
        backgroundColor: 'white',
        color: '#212B36',
        border: '1px solid rgba(145,158,171,0.20)',
        '&:hover': { backgroundColor: 'rgba(145,158,171,0.08)' },
      };

  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        px: 2.5,
        py: 1.25,
        borderRadius: 2,
        ...styles,
      }}
    >
      {children}
    </MuiButton>
  );
};
