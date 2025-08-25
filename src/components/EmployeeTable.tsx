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
  Tooltip
} from '@mui/material';
import { 
  ArrowUpward as ArrowUpIcon, 
  ArrowDownward as ArrowDownIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import { colaboradoresService, Colaborador } from '@/lib/colaboradores';

type SortField = 'nome' | 'email' | 'departamento' | 'status' | 'dataCriacao';
type SortDirection = 'asc' | 'desc' | null;

export default function EmployeeTable() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [sortedColaboradores, setSortedColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados de ordenação
  const [sortField, setSortField] = useState<SortField>('dataCriacao');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

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
      return <SortIcon sx={{ fontSize: 16, color: '#919EAB' }} />;
    }
    
    if (sortDirection === 'asc') {
      return <ArrowUpIcon sx={{ fontSize: 16, color: '#637381' }} />;
    } else {
      return <ArrowDownIcon sx={{ fontSize: 16, color: '#637381' }} />;
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (colaboradores.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Nenhum colaborador cadastrado ainda.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Use o botão &quot;Novo Colaborador&quot; para cadastrar o primeiro colaborador.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid rgba(145,158,171,0.20)', borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F4F6F8' }}>
            <TableCell sx={{ py: 2, px: 3, borderBottom: '1px solid rgba(145,158,171,0.20)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#637381' }}>
                  Nome
                </Typography>
                <Tooltip title={getSortTooltip('nome')}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleSort('nome')}
                    sx={{ p: 0.5 }}
                  >
                    {getSortIcon('nome')}
                  </IconButton>
                </Tooltip>
              </Box>
            </TableCell>
            <TableCell sx={{ py: 2, px: 3, borderBottom: '1px solid rgba(145,158,171,0.20)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#637381' }}>
                  Email
                </Typography>
                <Tooltip title={getSortTooltip('email')}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleSort('email')}
                    sx={{ p: 0.5 }}
                  >
                    {getSortIcon('email')}
                  </IconButton>
                </Tooltip>
              </Box>
            </TableCell>
            <TableCell sx={{ py: 2, px: 3, borderBottom: '1px solid rgba(145,158,171,0.20)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#637381' }}>
                  Departamento
                </Typography>
                <Tooltip title={getSortTooltip('departamento')}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleSort('departamento')}
                    sx={{ p: 0.5 }}
                  >
                    {getSortIcon('departamento')}
                  </IconButton>
                </Tooltip>
              </Box>
            </TableCell>
            <TableCell sx={{ py: 2, px: 3, borderBottom: '1px solid rgba(145,158,171,0.20)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#637381' }}>
                  Status
                </Typography>
                <Tooltip title={getSortTooltip('status')}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleSort('status')}
                    sx={{ p: 0.5 }}
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
                } 
              }}
            >
              <TableCell sx={{ py: 2, px: 3, borderBottom: '1px solid rgba(145,158,171,0.20)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      bgcolor: '#00AB55',
                      fontSize: '1rem',
                      fontWeight: 600
                    }}
                  >
                    {colaborador.nome.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#212B36' }}>
                    {colaborador.nome}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, borderBottom: '1px solid rgba(145,158,171,0.20)' }}>
                <Typography variant="body2" sx={{ color: '#637381' }}>
                  {colaborador.email}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, borderBottom: '1px solid rgba(145,158,171,0.20)' }}>
                <Typography variant="body2" sx={{ color: '#637381' }}>
                  {colaborador.departamento}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, borderBottom: '1px solid rgba(145,158,171,0.20)' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: colaborador.ativo ? 'rgba(0, 171, 85, 0.16)' : 'rgba(255, 76, 76, 0.16)',
                    color: colaborador.ativo ? '#00AB55' : '#FF4C4C',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    minWidth: 80,
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
  );
}