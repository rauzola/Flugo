"use client"

import { Box, AppBar, Toolbar, Avatar } from '@mui/material';

export default function Header() {
  

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: 'none',
        color: 'text.primary',
        height: 80
      }}
    >
      <Toolbar sx={{ height: '100%', justifyContent: 'flex-end', px: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            src="https://api.builder.io/api/v1/image/assets/TEMP/981e84f6bd2bb9fe7de87bdff69ad6abde7c5ef4?placeholderIfAbsent=true"
            alt="User avatar"
            sx={{ 
              width: 40, 
              height: 40,
              border: '2px solid',
              borderColor: 'rgba(145, 158, 171, 0.08)'
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};