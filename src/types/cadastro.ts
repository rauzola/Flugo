// Tipos compartilhados para o cadastro de colaboradores

export interface FormData {
  title: string;
  email: string;
  activateOnCreate: boolean;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

export interface Step {
  id: number;
  title: string;
  completed: boolean;
  active: boolean;
}

export interface BreadcrumbItem {
  label: string;
  active?: boolean;
}

// Constantes
export const DEPARTMENTS = [
  'Recursos Humanos',
  'Tecnologia da Informação',
  'Marketing',
  'Vendas',
  'Financeiro',
  'Operações'
] as const;

export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: 'Preencha o nome completo.',
  NAME_MIN_LENGTH: 'O nome deve ter pelo menos 3 letras.',
  EMAIL_REQUIRED: 'Preencha o e-mail.',
  EMAIL_INVALID: 'Digite um e-mail válido.',
  DEPARTMENT_REQUIRED: 'Selecione um departamento.',
  SUCCESS: 'Colaborador cadastrado com sucesso!',
  ERROR: 'Erro ao cadastrar colaborador. Tente novamente.'
} as const;

export const PROGRESS_STEP_1 = 0;
export const PROGRESS_STEP_2 = 50;
export const REDIRECT_DELAY = 2000;
