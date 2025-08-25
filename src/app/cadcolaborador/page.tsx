"use client"

import React, { useState } from 'react';
import { Box, Container, Typography, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
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

type FormData = {
  title: string;
  email: string;
  activateOnCreate: boolean;
};

type Errors = {
  title?: string;
  email?: string;
  department?: string;
};

export default function CadColaboradorOne() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    email: '',
    activateOnCreate: true,
  });

  const [errors, setErrors] = useState<Errors>({});

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [focusedField, setFocusedField] = useState<string | null>('title');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
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

  const isValidEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(value.trim());
  };

  const hasMinLetters = (value: string, min: number): boolean => {
    const onlyLetters = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, '');
    return onlyLetters.length >= min;
  };

  const validateStep1 = (): boolean => {
    const nextErrors: Errors = {};
    if (!formData.title.trim()) {
      nextErrors.title = 'Preencha o nome completo.';
    } else if (!hasMinLetters(formData.title, 3)) {
      nextErrors.title = 'Nome Completo deve ter pelo menos 3 letras.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Preencha o e-mail.';
    } else if (!isValidEmail(formData.email)) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const nextErrors: Errors = {};
    if (!selectedDepartment) nextErrors.department = 'Selecione um departamento.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, activateOnCreate: checked }));
  };

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value as string);
    setErrors(prev => ({ ...prev, department: undefined }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      if (!validateStep1()) return;
      setCurrentStep(currentStep + 1);
    } else {
      if (!validateStep2()) return;
      router.push('/');
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.push('/');
      return;
    }
    setCurrentStep(currentStep - 1);
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
                        error={!!errors.title}
                        helperText={errors.title}
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
                        error={!!errors.email}
                        helperText={errors.email}
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
                    <FormControl fullWidth error={!!errors.department}>
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
                      {errors.department && (
                        <FormHelperText>{errors.department}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 10, maxWidth: 833 }}>
            <PrimaryButton variant="secondary" onClick={handleBack}>
              Voltar
            </PrimaryButton>
            <PrimaryButton variant="primary" onClick={handleNext}>
              {currentStep === 2 ? 'Concluir' : 'Próximo'}
            </PrimaryButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
