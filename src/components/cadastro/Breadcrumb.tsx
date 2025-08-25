import React from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';

interface BreadcrumbItem {
  label: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  sx?: object;
}

export default function Breadcrumb({ items, className = '', sx = {} }: BreadcrumbProps) {
  return (
    <Box component="nav" aria-label="Breadcrumb" className={className} sx={sx}>
      <Breadcrumbs 
        separator=""
        sx={{
          '& .MuiBreadcrumbs-ol': {
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }
        }}
      >
        {items.map((item, index) => (
          <Typography
            key={index}
            sx={{
              color: item.active ? '#919EAB' : '#212B36',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.75,
              whiteSpace: 'nowrap',
              ...(item.active && {
                minWidth: 240,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: '1 1 0%',
              })
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Breadcrumbs>
    </Box>
  );
}
