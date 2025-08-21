"use client"

import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  IconButton
} from '@mui/material';
import { ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material';
import StatusBadge from './StatusBadge';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  status: 'active' | 'inactive';
  avatar: string;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'Fernanda Torres',
    email: 'fernandatorres@flugo.com',
    department: 'Design',
    status: 'active',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/760ab1445379808cb1fd6f71332ad799cd5522e8?placeholderIfAbsent=true'
  },
  {
    id: 2,
    name: "Joana D'Arc",
    email: 'joanadarc@flugo.com',
    department: 'TI',
    status: 'active',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/aec82f930c2eedd7841568e5ebf23d430e65f5fe?placeholderIfAbsent=true'
  },
  {
    id: 3,
    name: 'Mari Froes',
    email: 'marifroes@flugo.com',
    department: 'Marketing',
    status: 'active',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/046c9d3e091f0ba7a9466357f1ea9fa47a19392d?placeholderIfAbsent=true'
  },
  {
    id: 4,
    name: 'Clara Costa',
    email: 'claracosta@flugo.com',
    department: 'Produto',
    status: 'inactive',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/98060bb0d11af714fdfbdf0686965255f9c8a1c9?placeholderIfAbsent=true'
  }
];

export default function EmployeeTable() {
  const [employees] = useState<Employee[]>(initialEmployees);

  return (
    <Box sx={{ width: '100%', maxWidth: 1078, mt: 4 }}>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Nome
                  </Typography>
                  <IconButton size="small">
                    <ArrowUpwardIcon sx={{ width: 18, height: 18 }} />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Email
                  </Typography>
                  <IconButton size="small">
                    <ArrowUpwardIcon sx={{ width: 18, height: 18 }} />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Departamento
                  </Typography>
                  <IconButton size="small">
                    <ArrowUpwardIcon sx={{ width: 18, height: 18 }} />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Status
                  </Typography>
                  <IconButton size="small">
                    <ArrowUpwardIcon sx={{ width: 18, height: 18 }} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow 
                key={employee.id}
                sx={{ 
                  '&:last-child td': { border: 0 },
                  '&:hover': { backgroundColor: 'rgba(145, 158, 171, 0.04)' }
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={employee.avatar}
                      alt={`${employee.name} avatar`}
                      sx={{ 
                        width: 40, 
                        height: 40,
                        backgroundColor: 'grey.200'
                      }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 400 }}>
                      {employee.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {employee.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {employee.department}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusBadge status={employee.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};