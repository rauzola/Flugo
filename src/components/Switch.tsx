"use client"

import React from 'react';
import { Box, Switch as MuiSwitch, FormControlLabel } from '@mui/material';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, className = '' }) => {
  return (
    <Box className={className}>
      <FormControlLabel
        control={
          <MuiSwitch
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            sx={{
              width: 42,
              height: 26,
              padding: 0,
              '& .MuiSwitch-switchBase': {
                padding: 0,
                margin: '2px',
                transitionDuration: '300ms',
                '&.Mui-checked': {
                  transform: 'translateX(16px)',
                  color: '#fff',
                  '& + .MuiSwitch-track': {
                    backgroundColor: '#22C55E',
                    opacity: 1,
                    border: 0,
                  },
                },
              },
              '& .MuiSwitch-thumb': {
                boxSizing: 'border-box',
                width: 22,
                height: 22,
              },
              '& .MuiSwitch-track': {
                borderRadius: 26 / 2,
                backgroundColor: '#E9E9EA',
                opacity: 1,
                transition: 'background-color 200ms',
              },
            }}
          />
        }
        label={label}
        sx={{
          margin: 0,
          '& .MuiFormControlLabel-label': {
            color: '#212B36',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.75,
            marginLeft: 1,
          },
        }}
      />
    </Box>
  );
};
