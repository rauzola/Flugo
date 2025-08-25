"use client"

import React, { useState, useCallback, useMemo } from 'react';
import { Box, Container, Snackbar, Alert } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ProgressBar } from '@/components/ProgressBar';
import { StepperVertical } from '@/components/StepperVertical';
import { Step1BasicInfo } from '@/components/Step1BasicInfo';
import { Step2ProfessionalInfo } from '@/components/Step2ProfessionalInfo';
import { Button as PrimaryButton } from '@/components/Button';
import { colaboradoresService } from '@/lib/colaboradores';
import { 
  FormData, 
  SnackbarState, 
  Step, 
  BreadcrumbItem, 
  VALIDATION_MESSAGES, 
  PROGRESS_STEP_2, 
  REDIRECT_DELAY 
} from '@/types/cadastro';

// Hooks customizados
const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const showSnackbar = useCallback((message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  return { snackbar, showSnackbar, hideSnackbar };
};

const useFormValidation = () => {
  const isValidEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validateName = useCallback((name: string): string | null => {
    if (!name.trim()) return VALIDATION_MESSAGES.NAME_REQUIRED;
    if (name.trim().length < 3) return VALIDATION_MESSAGES.NAME_MIN_LENGTH;
    return null;
  }, []);

  const validateEmail = useCallback((email: string): string | null => {
    if (!email.trim()) return VALIDATION_MESSAGES.EMAIL_REQUIRED;
    if (!isValidEmail(email.trim())) return VALIDATION_MESSAGES.EMAIL_INVALID;
    return null;
  }, [isValidEmail]);

  const validateDepartment = useCallback((department: string): string | null => {
    if (!department) return VALIDATION_MESSAGES.DEPARTMENT_REQUIRED;
    return null;
  }, []);

  return { validateName, validateEmail, validateDepartment };
};

// Componente principal
export default function CadColaboradorOne() {
  // Estados
  const [formData, setFormData] = useState<FormData>({
    title: '',
    email: '',
    activateOnCreate: true,
  });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [focusedField, setFocusedField] = useState<string | null>('title');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Hooks customizados
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();
  const { validateName, validateEmail, validateDepartment } = useFormValidation();
  
  // Hooks do Next.js
  const router = useRouter();

  // Memoização de valores computados
  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => [
    { label: 'Colaboradores' },
    { label: 'Cadastrar Colaborador', active: true },
  ], []);

  const steps: Step[] = useMemo(() => [
    { 
      id: 1, 
      title: 'Infos Básicas', 
      completed: currentStep > 1, 
      active: currentStep === 1 
    },
    { 
      id: 2, 
      title: 'Infos Profissionais', 
      completed: false, 
      active: currentStep === 2 
    },
  ], [currentStep]);

  const progress = useMemo(() => 
    (currentStep - 1) * PROGRESS_STEP_2, [currentStep]
  );

  // Handlers
  const handleFieldChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSwitchChange = useCallback((checked: boolean) => {
    setFormData(prev => ({ ...prev, activateOnCreate: checked }));
  }, []);

  const handleDepartmentChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value as string);
  }, []);

  const validateStep1 = useCallback((): boolean => {
    const nameError = validateName(formData.title);
    if (nameError) {
      showSnackbar(nameError, 'error');
      return false;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      showSnackbar(emailError, 'error');
      return false;
    }

    return true;
  }, [formData.title, formData.email, validateName, validateEmail, showSnackbar]);

  const validateStep2 = useCallback((): boolean => {
    const departmentError = validateDepartment(selectedDepartment);
    if (departmentError) {
      showSnackbar(departmentError, 'error');
      return false;
    }
    return true;
  }, [selectedDepartment, validateDepartment, showSnackbar]);

  const handleNext = useCallback(async () => {
    if (currentStep < 2) {
      if (validateStep1()) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      if (validateStep2()) {
        await handleFinish();
      }
    }
  }, [currentStep, validateStep1, validateStep2]);

  const handleFinish = useCallback(async () => {
    try {
      setLoading(true);
      
      const novoColaborador = {
        nome: formData.title.trim(),
        email: formData.email.trim(),
        departamento: selectedDepartment,
        ativo: formData.activateOnCreate,
      };

      await colaboradoresService.cadastrar(novoColaborador);
      
      showSnackbar(VALIDATION_MESSAGES.SUCCESS, 'success');

      setTimeout(() => {
        router.push('/');
      }, REDIRECT_DELAY);

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      showSnackbar(VALIDATION_MESSAGES.ERROR, 'error');
    } finally {
      setLoading(false);
    }
  }, [formData, selectedDepartment, showSnackbar, router]);

  const handleBack = useCallback(() => {
    if (currentStep === 1) {
      router.push('/');
      return;
    }
    setCurrentStep(currentStep - 1);
  }, [currentStep, router]);

  const handleFieldFocus = useCallback((field: string) => {
    setFocusedField(field);
  }, []);

  const handleFieldBlur = useCallback(() => {
    setFocusedField(null);
  }, []);

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
                <Step1BasicInfo
                  formData={formData}
                  focusedField={focusedField}
                  onFieldChange={handleFieldChange}
                  onSwitchChange={handleSwitchChange}
                  onFieldFocus={handleFieldFocus}
                  onFieldBlur={handleFieldBlur}
                />
              )}

              {currentStep === 2 && (
                <Step2ProfessionalInfo
                  selectedDepartment={selectedDepartment}
                  onDepartmentChange={handleDepartmentChange}
                />
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
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={hideSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
