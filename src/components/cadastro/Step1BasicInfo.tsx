import React from 'react';
import { Box, Typography } from '@mui/material';
import { FormField } from '../FormField';
import { Switch as Toggle } from '../Switch';
import { FormData } from '@/types/cadastro';

interface Step1BasicInfoProps {
  formData: FormData;
  focusedField: string | null;
  onFieldChange: (field: keyof FormData, value: string) => void;
  onSwitchChange: (checked: boolean) => void;
  onFieldFocus: (field: string) => void;
  onFieldBlur: () => void;
}

export const Step1BasicInfo: React.FC<Step1BasicInfoProps> = ({
  formData,
  focusedField,
  onFieldChange,
  onSwitchChange,
  onFieldFocus,
  onFieldBlur
}) => {
  return (
    <>
      <Typography sx={{ color: '#637381', fontSize: 20, fontWeight: 700 }}>
        Informações Básicas
      </Typography>

      <Box component="form" sx={{ mt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <FormField
            label="Nome Completo"
            value={formData.title}
            onChange={(value) => onFieldChange('title', value)}
            focused={focusedField === 'title'}
            onFocus={() => onFieldFocus('title')}
            onBlur={onFieldBlur}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormField
            label="E-mail"
            value={formData.email}
            onChange={(value) => onFieldChange('email', value)}
            placeholder="e.g. john@gmail.com"
            type="email"
            focused={focusedField === 'email'}
            onFocus={() => onFieldFocus('email')}
            onBlur={onFieldBlur}
          />
        </Box>

        <Toggle
          checked={formData.activateOnCreate}
          onChange={onSwitchChange}
          label="Ativar ao criar"
          className="mt-6"
        />
      </Box>
    </>
  );
};
