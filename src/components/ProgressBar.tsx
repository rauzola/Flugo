"use client"

import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        height: 4,
        flexWrap: 'wrap' 
      }} 
      className={className}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          flex: '1 1 0%',
          minWidth: 240,
          height: 4,
          borderRadius: 500,
          bgcolor: 'rgba(34,197,94,0.24)',
          '& .MuiLinearProgress-bar': {
            bgcolor: '#22C55E',
            borderRadius: 500,
          }
        }}
      />
      <Typography
        sx={{
          color: '#637381',
          fontSize: 12,
          fontWeight: 400,
          whiteSpace: 'nowrap',
        }}
      >
        {progress}%
      </Typography>
    </Box>
  );
};
