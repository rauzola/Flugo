"use client"

import React from 'react';
import { Box, Typography, Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StepData {
  id: number;
  title: string;
  completed: boolean;
  active: boolean;
}

interface StepperVerticalProps {
  steps: StepData[];
  className?: string;
}

const CustomStepConnector = styled(StepConnector)(() => ({
  '& .MuiStepConnector-line': {
    borderLeft: '1px dashed rgba(145,158,171,0.40)',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    marginLeft: 12,
    marginTop: 12,
    marginBottom: 12,
    minHeight: 140,
  },
}));

const CustomStepIcon = styled('div')<{ completed: boolean }>(({ completed }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 600,
  color: completed ? 'white' : '#637381',
  backgroundColor: completed ? '#22C55E' : '#DFE3E8',
}));

export const StepperVertical: React.FC<StepperVerticalProps> = ({ steps, className = '' }) => {
  return (
    <Box sx={{ minHeight: 272 }} className={className}>
      <Stepper 
        orientation="vertical" 
        connector={<CustomStepConnector />}
        sx={{
          '& .MuiStep-root': { padding: 0, pb: 2 },
          '& .MuiStepLabel-root': { padding: 0 }
        }}
      >
        {steps.map((step) => (
          <Step key={step.id} active>
            <StepLabel
              icon={
                <CustomStepIcon completed={step.completed}>
                  {step.id}
                </CustomStepIcon>
              }
              sx={{ '& .MuiStepLabel-labelContainer': { ml: 1 } }}
            >
              <Typography
                sx={{
                  color: step.active ? '#212B36' : '#919EAB',
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.75,
                }}
              >
                {step.title}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
