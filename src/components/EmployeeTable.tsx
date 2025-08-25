"use client"

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Avatar, 
  Typography, 
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Drawer,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Divider,
  Snackbar
} from '@mui/material';
import { 
  ArrowUpward as ArrowUpIcon, 
  ArrowDownward as ArrowDownIcon,
  Sort as SortIcon,
  Edit as EditIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { colaboradoresService, Colaborador } from '@/lib/colaboradores';

type SortField = 'nome' | 'email' | 'departamento' | 'status' | 'dataCriacao';
type SortDirection = 'asc' | 'desc' | null;

export default function EmployeeTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [sortedColaboradores, setSortedColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados de ordenação
  const [sortField, setSortField] = useState<SortField>('dataCriacao');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Estados do Drawer de edição
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);
  const [editForm, setEditForm] = useState({
    nome: '',
    email: '',
    departamento: '',
    ativo: true
  });
  const [editLoading, setEditLoading] = useState(false);

  // Estado do Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as 'success' | 'error' | 'info' | 'warning'
  });

  const departments = [
    'Recursos Humanos',
    'Tecnologia da Informação',
    'Marketing',
    'Vendas',
    'Financeiro',
    'Operações'
  ];

  useEffect(() => {
    const carregarColaboradores = async () => {
      try {
        setLoading(true);
        const dados = await colaboradoresService.buscarTodos();
        setColaboradores(dados);
        setSortedColaboradores(dados);
      } catch (err) {
        setError('Erro ao carregar colaboradores');
        console.error('Erro ao carregar colaboradores:', err);
      } finally {
        setLoading(false);
      }
    };

    carregarColaboradores();
  }, []);

  // Aplicar ordenação
  useEffect(() => {
    if (!colaboradores.length) return;

    const resultado = [...colaboradores];

    resultado.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'nome':
          aValue = a.nome.toLowerCase();
          bValue = b.nome.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'departamento':
          aValue = a.departamento.toLowerCase();
          bValue = b.departamento.toLowerCase();
          break;
        case 'status':
          aValue = a.ativo ? 1 : 0;
          bValue = b.ativo ? 1 : 0;
          break;
        case 'dataCriacao':
        default:
          aValue = a.dataCriacao;
          bValue = b.dataCriacao;
          break;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setSortedColaboradores(resultado);
  }, [colaboradores, sortField, sortDirection]);

  // Função para alternar ordenação
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Se clicar no mesmo campo, alterna a direção
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Se clicar em um campo diferente, define como ascendente
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Função para obter o ícone de ordenação
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <SortIcon sx={{ fontSize: isSmallMobile ? 14 : 16, color: '#919EAB' }} />;
    }
    
    if (sortDirection === 'asc') {
      return <ArrowUpIcon sx={{ fontSize: isSmallMobile ? 14 : 16, color: '#637381' }} />;
    } else {
      return <ArrowDownIcon sx={{ fontSize: isSmallMobile ? 14 : 16, color: '#637381' }} />;
    }
  };

  // Função para obter o tooltip de ordenação
  const getSortTooltip = (field: SortField) => {
    if (sortField !== field) {
      return `Ordenar por ${field}`;
    }
    
    if (sortDirection === 'asc') {
      return `Ordenado por ${field} (A-Z)`;
    } else {
      return `Ordenado por ${field} (Z-A)`;
    }
  };

  // Função para abrir o Drawer de edição
  const handleRowClick = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador);
    setEditForm({
      nome: colaborador.nome,
      email: colaborador.email,
      departamento: colaborador.departamento,
      ativo: colaborador.ativo
    });
    setDrawerOpen(true);
  };

  // Função para fechar o Drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedColaborador(null);
    setEditForm({
      nome: '',
      email: '',
      departamento: '',
      ativo: true
    });
  };

  // Função para salvar as alterações
  const handleSaveEdit = async () => {
    if (!selectedColaborador) return;

    try {
      setEditLoading(true);
      
      // Atualiza o colaborador no Firebase
      await colaboradoresService.atualizar(selectedColaborador.id!, {
        nome: editForm.nome,
        email: editForm.email,
        departamento: editForm.departamento,
        ativo: editForm.ativo
      });
      
      // Fecha o drawer
      handleCloseDrawer();
      
      // Recarrega a lista para mostrar as alterações
      const dados = await colaboradoresService.buscarTodos();
      setColaboradores(dados);
      setSortedColaboradores(dados);
      
      // Mostra mensagem de sucesso
      setSnackbar({
        open: true,
        message: 'Colaborador atualizado com sucesso!',
        severity: 'success'
      });
      
    } catch (error) {
      console.error('Erro ao atualizar colaborador:', error);
      
      // Mostra mensagem de erro
      setSnackbar({
        open: true,
        message: 'Erro ao atualizar colaborador. Tente novamente.',
        severity: 'error'
      });
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: isMobile ? 2 : 4 }}>
        <CircularProgress size={isMobile ? 32 : 40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: isMobile ? 2 : 4 }}>
        <Alert severity="error" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (colaboradores.length === 0) {
    return (
      <Box sx={{ py: isMobile ? 2 : 4, textAlign: 'center' }}>
        <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary">
          Nenhum colaborador cadastrado ainda.
        </Typography>
        <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary" sx={{ mt: 1 }}>
          Use o botão &quot;Novo Colaborador&quot; para cadastrar o primeiro colaborador.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none', 
          border: '1px solid rgba(145,158,171,0.20)', 
          borderRadius: 2,
          maxWidth: '100%',
          overflowX: 'auto'
        }}
      >
        <Table sx={{ minWidth: isMobile ? 600 : 800 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F4F6F8' }}>
              <TableCell sx={{ 
                py: isMobile ? 1.5 : 2, 
                px: isMobile ? 1.5 : 3, 
                borderBottom: '1px solid rgba(145,158,171,0.20)',
                minWidth: isMobile ? 120 : 150
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
                  <Typography variant={isMobile ? "caption" : "body2"} sx={{ 
                    fontWeight: 600, 
                    color: '#637381',
                    fontSize: isMobile ? '0.75rem' : '0.875rem'
                  }}>
                    Nome
                  </Typography>
                  <Tooltip title={getSortTooltip('nome')}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleSort('nome')}
                      sx={{ 
                        p: isMobile ? 0.25 : 0.5,
                        '&:hover': { bgcolor: 'rgba(145,158,171,0.08)' }
                      }}
                    >
                      {getSortIcon('nome')}
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell sx={{ 
                py: isMobile ? 1.5 : 2, 
                px: isMobile ? 1.5 : 3, 
                borderBottom: '1px solid rgba(145,158,171,0.20)',
                minWidth: isMobile ? 140 : 180
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
                  <Typography variant={isMobile ? "caption" : "body2"} sx={{ 
                    fontWeight: 600, 
                    color: '#637381',
                    fontSize: isMobile ? '0.75rem' : '0.875rem'
                  }}>
                    Email
                  </Typography>
                  <Tooltip title={getSortTooltip('email')}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleSort('email')}
                      sx={{ 
                        p: isMobile ? 0.25 : 0.5,
                        '&:hover': { bgcolor: 'rgba(145,158,171,0.08)' }
                      }}
                    >
                      {getSortIcon('email')}
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell sx={{ 
                py: isMobile ? 1.5 : 2, 
                px: isMobile ? 1.5 : 3, 
                borderBottom: '1px solid rgba(145,158,171,0.20)',
                minWidth: isMobile ? 120 : 150
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
                  <Typography variant={isMobile ? "caption" : "body2"} sx={{ 
                    fontWeight: 600, 
                    color: '#637381',
                    fontSize: isMobile ? '0.75rem' : '0.875rem'
                  }}>
                    Departamento
                  </Typography>
                  <Tooltip title={getSortTooltip('departamento')}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleSort('departamento')}
                      sx={{ 
                        p: isMobile ? 0.25 : 0.5,
                        '&:hover': { bgcolor: 'rgba(145,158,171,0.08)' }
                      }}
                    >
                      {getSortIcon('departamento')}
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell sx={{ 
                py: isMobile ? 1.5 : 2, 
                px: isMobile ? 1.5 : 3, 
                borderBottom: '1px solid rgba(145,158,171,0.20)',
                minWidth: isMobile ? 80 : 100
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
                  <Typography variant={isMobile ? "caption" : "body2"} sx={{ 
                    fontWeight: 600, 
                    color: '#637381',
                    fontSize: isMobile ? '0.75rem' : '0.875rem'
                  }}>
                    Status
                  </Typography>
                  <Tooltip title={getSortTooltip('status')}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleSort('status')}
                      sx={{ 
                        p: isMobile ? 0.25 : 0.5,
                        '&:hover': { bgcolor: 'rgba(145,158,171,0.08)' }
                      }}
                    >
                      {getSortIcon('status')}
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedColaboradores.map((colaborador) => (
              <TableRow 
                key={colaborador.id} 
                sx={{ 
                  '&:hover': { 
                    bgcolor: 'rgba(145,158,171,0.08)' 
                  },
                  cursor: 'pointer'
                }}
                onClick={() => handleRowClick(colaborador)}
              >
                <TableCell sx={{ 
                  py: isMobile ? 1.5 : 2, 
                  px: isMobile ? 1.5 : 3, 
                  borderBottom: '1px solid rgba(145,158,171,0.20)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
                    <Avatar 
                      sx={{ 
                        width: isMobile ? 32 : 40, 
                        height: isMobile ? 32 : 40, 
                        bgcolor: '#00AB55',
                        fontSize: isMobile ? '0.75rem' : '1rem',
                        fontWeight: 600
                      }}
                    >
                      {colaborador.nome.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant={isMobile ? "caption" : "body2"} sx={{ 
                      fontWeight: 600, 
                      color: '#212B36',
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      wordBreak: 'break-word'
                    }}>
                      {colaborador.nome}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  py: isMobile ? 1.5 : 2, 
                  px: isMobile ? 1.5 : 3, 
                  borderBottom: '1px solid rgba(145,158,171,0.20)'
                }}>
                  <Typography variant={isMobile ? "caption" : "body2"} sx={{ 
                    color: '#637381',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    wordBreak: 'break-all'
                  }}>
                    {colaborador.email}
                  </Typography>
                </TableCell>
                <TableCell sx={{ 
                  py: isMobile ? 1.5 : 2, 
                  px: isMobile ? 1.5 : 3, 
                  borderBottom: '1px solid rgba(145,158,171,0.20)'
                }}>
                  <Typography variant={isMobile ? "caption" : "body2"} sx={{ 
                    color: '#637381',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    wordBreak: 'break-word'
                  }}>
                    {colaborador.departamento}
                  </Typography>
                </TableCell>
                <TableCell sx={{ 
                  py: isMobile ? 1.5 : 2, 
                  px: isMobile ? 1.5 : 3, 
                  borderBottom: '1px solid rgba(145,158,171,0.20)'
                }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: isMobile ? 1 : 1.5,
                      py: isMobile ? 0.25 : 0.5,
                      borderRadius: 1,
                      bgcolor: colaborador.ativo ? 'rgba(0, 171, 85, 0.16)' : 'rgba(255, 76, 76, 0.16)',
                      color: colaborador.ativo ? '#00AB55' : '#FF4C4C',
                      fontSize: isMobile ? '0.625rem' : '0.75rem',
                      fontWeight: 600,
                      minWidth: isMobile ? 60 : 80,
                      justifyContent: 'center'
                    }}
                  >
                    {colaborador.ativo ? 'Ativo' : 'Inativo'}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Indicador de scroll horizontal para mobile */}
      {isMobile && (
        <Box sx={{ 
          mt: 2, 
          textAlign: 'center',
          px: 2
        }}>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{
              fontSize: '0.75rem',
              color: '#637381',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
          >
            ← Deslize horizontalmente para ver todas as colunas →
          </Typography>
        </Box>
      )}

      {/* Drawer de edição */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: isMobile ? '100%' : 400,
            p: 3
          }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header do Drawer */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#212B36' }}>
              Editar Colaborador
            </Typography>
            <IconButton onClick={handleCloseDrawer} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Formulário de edição */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Nome Completo"
                value={editForm.nome}
                onChange={(e) => setEditForm(prev => ({ ...prev, nome: e.target.value }))}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                label="E-mail"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                fullWidth
                variant="outlined"
                type="email"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth>
                <Select
                  value={editForm.departamento}
                  onChange={(e) => setEditForm(prev => ({ ...prev, departamento: e.target.value }))}
                  displayEmpty
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  {departments.map((department) => (
                    <MenuItem key={department} value={department}>
                      {department}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth>
                <Select
                  value={editForm.ativo ? 'ativo' : 'inativo'}
                  onChange={(e) => setEditForm(prev => ({ ...prev, ativo: e.target.value === 'ativo' }))}
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  <MenuItem value="ativo">Ativo</MenuItem>
                  <MenuItem value="inativo">Inativo</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Botões de ação */}
          <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
            <Button
              variant="outlined"
              onClick={handleCloseDrawer}
              fullWidth
              sx={{ borderRadius: '8px' }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveEdit}
              disabled={editLoading}
              fullWidth
              sx={{ 
                borderRadius: '8px',
                backgroundColor: '#22C55E',
                '&:hover': {
                  backgroundColor: '#16A34A',
                }
              }}
            >
              {editLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}