import React from 'react';
import { Button } from '@mui/material';

interface CadButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function CadButton({ variant = 'primary', children, onClick, disabled }: CadButtonProps) {
  const styles = variant === 'primary'
    ? {
        backgroundColor: '#22C55E',
        color: 'white',
        '&:hover': { backgroundColor: '#16A34A' },
      }
    : {
        backgroundColor: 'white',
        color: '#212B36',
        border: '1px solid rgba(145, 158, 171, 0.32)',
        '&:hover': { backgroundColor: 'rgba(145, 158, 171, 0.08)' },
      };

  return (
    <Button
      variant={variant === 'primary' ? 'contained' : 'outlined'}
      onClick={onClick}
      disabled={disabled}
      sx={{ px: 3, py: 1.5, fontWeight: 600, ...styles }}
    >
      {children}
    </Button>
  );
}
