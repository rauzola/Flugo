"use client"

import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Paper,
  Avatar
} from '@mui/material';
import { People as PeopleIcon, KeyboardArrowRight } from '@mui/icons-material';

export default function Sidebar() {
 

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: 280, 
        height: 'auto',
        borderRadius: 0,
        borderRight: '1px dashed',
        borderColor: 'rgba(145, 158, 171, 0.2)',
        p: 2
      }}
    >
      <Box sx={{ pt: 3, pb: 1, px: 2 }}>
        <Avatar
          src="/logo.png"
          alt="Company Logo"
          variant="square"
          sx={{ 
            width: 75, 
            height: 28,
            '& img': {
              objectFit: 'contain'
            }
          }}
        />
      </Box>
      
      <List sx={{ px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton 
            sx={{ 
              borderRadius: 2,
              py: 1.5,
              px: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(145, 158, 171, 0.08)',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <PeopleIcon 
                sx={{ 
                  width: 24, 
                  height: 24, 
                  color: 'text.secondary' 
                }} 
              />
            </ListItemIcon>
            <ListItemText 
              primary="Colaboradores"
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'text.secondary'
              }}
            />
            <KeyboardArrowRight 
              sx={{ 
                width: 16, 
                height: 16, 
                color: 'text.secondary' 
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};