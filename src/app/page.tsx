"use client"

import React from 'react';
import { Box, Typography, Button, Container, useTheme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import EmployeeTable from '@/components/EmployeeTable';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNewEmployee = () => {
    router.push('/cadcolaborador');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      width: '100%', // Mudado de 100vw para 100% para evitar scroll horizontal
      overflow: 'hidden',
      flexDirection: { xs: 'column', sm: 'row' } // Stack vertical no mobile muito pequeno
    }}>
      <Sidebar />

      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: 0, // Previne overflow no mobile
        overflow: 'hidden' // Controla overflow interno
      }}>
        <Header />

        <Container 
          maxWidth={false} 
          sx={{ 
            py: { xs: 2, sm: 3, md: 4 }, 
            flexGrow: 1, 
            px: { xs: 1.5, sm: 2, md: 4 },
            minWidth: 0, // Previne overflow
            overflow: 'hidden' // Controla overflow interno
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'center', sm: 'space-between' }, 
            alignItems: { xs: 'center', sm: 'center' }, 
            mb: { xs: 2, sm: 3, md: 4 }, // Reduzido margin no mobile
            gap: { xs: 2, sm: 3, md: 0 }
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600, 
                color: '#161C24',
                fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.125rem' }, // Reduzido no mobile
                textAlign: { xs: 'center', sm: 'left' },
                lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 },
                order: { xs: 1, sm: 1 } // Mantém ordem no mobile
              }}
            >
              Colaboradores
            </Typography>
            <Button
              variant="contained"
              onClick={handleNewEmployee}
              sx={{
                backgroundColor: '#22C55E',
                '&:hover': {
                  backgroundColor: '#16A34A',
                },
                textTransform: 'none',
                px: { xs: 3, sm: 3, md: 3 },
                py: { xs: 1.5, sm: 1.5, md: 1.5 },
                fontSize: { xs: '0.875rem', sm: '0.875rem', md: '0.875rem' },
                fontWeight: 600,
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: 280, sm: 300, md: 'none' }, // Largura máxima ajustada
                minHeight: { xs: 48, sm: 48, md: 48 }, // Altura mínima consistente
                borderRadius: { xs: 2, sm: 2, md: 2 },
                order: { xs: 2, sm: 2 }, // Mantém ordem no mobile
                boxShadow: { xs: 2, sm: 2, md: 2 } // Sombra sutil no mobile
              }}
            >
              Novo Colaborador
            </Button>
          </Box>

          <EmployeeTable />
        </Container>
      </Box>
    </Box>
  );
}
