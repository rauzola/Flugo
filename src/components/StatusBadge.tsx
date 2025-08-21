"use client"

import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface StatusBadgeProps {
  status: 'active' | 'inactive';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const theme = useTheme();
  const isActive = status === 'active';
  
  return (
    <Chip
      label={isActive ? 'Ativo' : 'Inativo'}
      size="small"
      sx={{
        backgroundColor: isActive 
          ? 'rgba(34, 197, 94, 0.16)' 
          : 'rgba(255, 86, 48, 0.16)',
        color: isActive ? theme.palette.success.main : theme.palette.error.main,
        fontWeight: 700,
        fontSize: '0.75rem',
        height: 24,
        minWidth: 48,
        '& .MuiChip-label': {
          px: 1.5,
          py: 0,
        },
      }}
    />
  );
};