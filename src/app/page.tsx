"use client"

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import EmployeeTable from '@/components/EmployeeTable';

export default function Home() {
  const router = useRouter();

  const handleNewEmployee = () => {
    router.push('/cadcolaborador');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <Container maxWidth={false} sx={{ py: 4, flexGrow: 1, px: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#161C24' }}>
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
                px: 3,
                py: 1.5,
                fontSize: '0.875rem',
                fontWeight: 600,
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
