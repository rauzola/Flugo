"use client"

import { 
  Box, 
  Container, 
  Typography, 
  Button,
  Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import EmployeeTable from '@/components/EmployeeTable';

export default function Home() {
  const [showNewEmployeeForm, setShowNewEmployeeForm] = useState(false);

  const handleNewEmployee = () => {
    setShowNewEmployeeForm(true);
    // In a real app, this would open a modal or navigate to a form page
    alert('Funcionalidade de novo colaborador seria implementada aqui!');
  };

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>
      <Sidebar />
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        
        <Container 
          maxWidth={false} 
          sx={{ 
            py: 4, 
            flexGrow: 1,
            px: 4
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 4,
              maxWidth: 1078,
              mx: 'auto',
              width: '100%'
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Colaboradores
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleNewEmployee}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                px: 2,
                py: 1.5,
                fontSize: '0.9375rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Novo Colaborador
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <EmployeeTable />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
