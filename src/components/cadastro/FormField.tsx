import React from 'react';
import { TextField, Box } from '@mui/material';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  focused?: boolean;
  className?: string;
  type?: 'text' | 'email';
  onFocus?: () => void;
  onBlur?: () => void;
  sx?: object;
}

export default function FormField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  focused = false,
  className = '',
  type = 'text',
  onFocus,
  onBlur,
  sx = {}
}: FormFieldProps) {
  return (
    <Box className={className} sx={{ width: '100%', ...sx }}>
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        type={type}
        variant="outlined"
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: focused ? '#1BB55C' : '#263238',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: focused ? '#1BB55C' : '#263238',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1BB55C',
            },
          },
          '& .MuiInputLabel-root': {
            color: focused ? '#1BB55C' : '#263238',
            fontSize: 12,
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#1BB55C',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: '#263238',
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '0.16px',
            padding: '18px 14px',
          },
          ...sx
        }}
      />
    </Box>
  );
}
