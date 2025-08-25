import React from 'react';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { DEPARTMENTS } from '@/types/cadastro';

interface Step2ProfessionalInfoProps {
  selectedDepartment: string;
  onDepartmentChange: (event: SelectChangeEvent<string>) => void;
}

export const Step2ProfessionalInfo: React.FC<Step2ProfessionalInfoProps> = ({
  selectedDepartment,
  onDepartmentChange
}) => {
  return (
    <>
      <Typography sx={{ color: '#637381', fontSize: 20, fontWeight: 700 }}>
        Informações Profissionais
      </Typography>

      <Box sx={{ width: '100%', mt: 3 }}>
        <FormControl fullWidth>
          <Select
            value={selectedDepartment}
            onChange={onDepartmentChange}
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
            {DEPARTMENTS.map((department) => (
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
  );
};
