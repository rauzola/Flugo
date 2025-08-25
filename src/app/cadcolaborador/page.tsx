"use client"

import React, { useState } from 'react';
import { Box, Container, Typography, FormControl, Select, MenuItem, FormHelperText, Snackbar, Alert } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ProgressBar } from '@/components/ProgressBar';
import { StepperVertical } from '@/components/StepperVertical';
import { FormField } from '@/components/FormField';
import { Switch as Toggle } from '@/components/Switch';
import { Button as PrimaryButton } from '@/components/Button';
import { colaboradoresService } from '@/lib/colaboradores';

type FormData = {
  title: string;
  email: string;
  activateOnCreate: boolean;
};

export default function CadColaboradorOne() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    email: '',
    activateOnCreate: true,
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [focusedField, setFocusedField] = useState<string | null>('title');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const router = useRouter();

  const departments: string[] = [
    'Recursos Humanos',
    'Tecnologia da Informação',
    'Marketing',
    'Vendas',
    'Financeiro',
    'Operações'
  ];

  const breadcrumbItems = [
    { label: 'Colaboradores' },
    { label: 'Cadastrar Colaborador', active: true },
  ];

  const steps = [
    { id: 1, title: 'Infos Básicas', completed: currentStep > 1, active: currentStep === 1 },
    { id: 2, title: 'Infos Profissionais', completed: false, active: currentStep === 2 },
  ];

  // Função para validar email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, activateOnCreate: checked }));
  };

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value as string);
  };

  const handleNext = async () => {
    if (currentStep < 2) {
      // Validações para Step 1
      if (!formData.title.trim()) {
        setSnackbar({
          open: true,
          message: 'Preencha o nome completo.',
          severity: 'error'
        });
        return;
      }

      if (formData.title.trim().length < 3) {
        setSnackbar({
          open: true,
          message: 'O nome deve ter pelo menos 3 letras.',
          severity: 'error'
        });
        return;
      }

      if (!formData.email.trim()) {
        setSnackbar({
          open: true,
          message: 'Preencha o e-mail.',
          severity: 'error'
        });
        return;
      }

      if (!isValidEmail(formData.email.trim())) {
        setSnackbar({
          open: true,
          message: 'Digite um e-mail válido.',
          severity: 'error'
        });
        return;
      }

      setCurrentStep(currentStep + 1);
    } else {
      if (!selectedDepartment) {
        setSnackbar({
          open: true,
          message: 'Selecione um departamento.',
          severity: 'error'
        });
        return;
      }
      await handleFinish();
    }
  };

  const handleFinish = async () => {
    try {
      setLoading(true);
      
      const novoColaborador = {
        nome: formData.title.trim(),
        email: formData.email.trim(),
        departamento: selectedDepartment,
        ativo: formData.activateOnCreate,
      };

      await colaboradoresService.cadastrar(novoColaborador);
      
      setSnackbar({
        open: true,
        message: 'Colaborador cadastrado com sucesso!',
        severity: 'success'
      });

      // Aguarda um pouco para mostrar a mensagem antes de redirecionar
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao cadastrar colaborador. Tente novamente.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.push('/');
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Progress: Step 1 => 0%, Step 2 => 50%
  const progress = (currentStep - 1) * 50;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <Container maxWidth={false} sx={{ py: 4, flexGrow: 1, px: 4 }}>
          <Breadcrumb items={breadcrumbItems} />

          <ProgressBar progress={progress} className="mt-6" />

          <Box sx={{ display: 'flex', gap: 4, mt: 5, flexWrap: 'wrap' }}>
            <StepperVertical steps={steps} />

            <Box sx={{ flex: 1, minWidth: 320 }}>
              {currentStep === 1 && (
                <>
                  <Typography sx={{ color: '#637381', fontSize: 20, fontWeight: 700 }}>
                    Informações Básicas
                  </Typography>

                  <Box component="form" sx={{ mt: 3 }}>
                    <Box sx={{ mb: 3 }}>
                      <FormField
                        label="Nome Completo"
                        value={formData.title}
                        onChange={(value) => handleFieldChange('title', value)}
                        focused={focusedField === 'title'}
                        onFocus={() => setFocusedField('title')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <FormField
                        label="E-mail"
                        value={formData.email}
                        onChange={(value) => handleFieldChange('email', value)}
                        placeholder="e.g. john@gmail.com"
                        type="email"
                        focused={focusedField === 'email'}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </Box>

                    <Toggle
                      checked={formData.activateOnCreate}
                      onChange={handleSwitchChange}
                      label="Ativar ao criar"
                      className="mt-6"
                    />
                  </Box>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <Typography sx={{ color: '#637381', fontSize: 20, fontWeight: 700 }}>
                    Informações Profissionais
                  </Typography>

                  <Box sx={{ width: '100%', mt: 3 }}>
                    <FormControl fullWidth>
                      <Select
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                        displayEmpty
                        IconComponent={KeyboardArrowDown}
                        sx={{
                          minHeight: 54,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(145,158,171,0.20)',
                            borderRadius: 2,
                          },
                          '& .MuiSelect-select': {
                            color: selectedDepartment ? '#212B36' : '#919EAB',
                            fontSize: 14,
                            fontWeight: 400,
                            py: 2,
                            px: 1.75,
                          },
                        }}
                      >
                        <MenuItem value="" disabled sx={{ color: '#919EAB' }}>
                          Selecione um departamento
                        </MenuItem>
                        {departments.map((department) => (
                          <MenuItem
                            key={department}
                            value={department}
                            sx={{
                              fontSize: 14,
                              '&:hover': {
                                bgcolor: 'rgba(0, 0, 0, 0.04)',
                              },
                            }}
                          >
                            {department}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 10, maxWidth: 833 }}>
            <PrimaryButton variant="secondary" onClick={handleBack} disabled={loading}>
              Voltar
            </PrimaryButton>
            <PrimaryButton 
              variant="primary" 
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? 'Salvando...' : (currentStep === 2 ? 'Concluir' : 'Próximo')}
            </PrimaryButton>
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
