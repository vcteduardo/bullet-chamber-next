'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@/components/Button';

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'Aberto' | 'Em Andamento' | 'Resolvido' | 'Fechado';
  priority: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

const mockTickets: Ticket[] = [
  {
    id: 1,
    title: 'Erro ao acessar o sistema',
    description: 'Usuário não consegue fazer login no sistema',
    status: 'Aberto',
    priority: 'Alta',
    category: 'Acesso',
    createdAt: '2024-02-15 09:30',
    updatedAt: '2024-02-15 10:15',
    assignedTo: 'João Silva',
  },
  {
    id: 2,
    title: 'Atualização de cadastro',
    description: 'Cliente precisa atualizar informações cadastrais',
    status: 'Em Andamento',
    priority: 'Média',
    category: 'Suporte',
    createdAt: '2024-02-14 14:20',
    updatedAt: '2024-02-15 11:00',
    assignedTo: 'Maria Santos',
  },
  {
    id: 3,
    title: 'Sistema lento',
    description: 'Sistema apresentando lentidão em horário de pico',
    status: 'Resolvido',
    priority: 'Crítica',
    category: 'Infraestrutura',
    createdAt: '2024-02-13 16:45',
    updatedAt: '2024-02-14 09:30',
    assignedTo: 'Pedro Costa',
  },
];

const getPriorityColor = (priority: string): 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' => {
  switch (priority) {
    case 'Baixa':
      return 'success';
    case 'Média':
      return 'info';
    case 'Alta':
      return 'warning';
    case 'Crítica':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' => {
  switch (status) {
    case 'Aberto':
      return 'error';
    case 'Em Andamento':
      return 'warning';
    case 'Resolvido':
      return 'success';
    case 'Fechado':
      return 'default';
    default:
      return 'default';
  }
};

export default function Tickets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [priorityFilter, setPriorityFilter] = useState('Todas');

  const filteredTickets = mockTickets.filter(ticket =>
    (statusFilter === 'Todos' || ticket.status === statusFilter) &&
    (priorityFilter === 'Todas' || ticket.priority === priorityFilter) &&
    (ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Tickets
        </Typography>
        <Button startIcon={<AddIcon />} size="large">
          Novo Ticket
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Buscar tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="Todos">Todos</MenuItem>
                    <MenuItem value="Aberto">Aberto</MenuItem>
                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                    <MenuItem value="Resolvido">Resolvido</MenuItem>
                    <MenuItem value="Fechado">Fechado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Prioridade</InputLabel>
                  <Select
                    value={priorityFilter}
                    label="Prioridade"
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <MenuItem value="Todas">Todas</MenuItem>
                    <MenuItem value="Baixa">Baixa</MenuItem>
                    <MenuItem value="Média">Média</MenuItem>
                    <MenuItem value="Alta">Alta</MenuItem>
                    <MenuItem value="Crítica">Crítica</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper>
            <List>
              {filteredTickets.map((ticket, index) => (
                <Box key={ticket.id}>
                  <ListItem
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Button customVariant="secondary" size="small">
                          Ver Detalhes
                        </Button>
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="subtitle1">
                            {ticket.title}
                          </Typography>
                          <Chip
                            label={ticket.status}
                            size="small"
                            color={getStatusColor(ticket.status)}
                          />
                          <Chip
                            label={ticket.priority}
                            size="small"
                            color={getPriorityColor(ticket.priority)}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {ticket.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary', fontSize: '0.875rem' }}>
                            <Typography variant="body2">
                              Categoria: {ticket.category}
                            </Typography>
                            {ticket.assignedTo && (
                              <>
                                <Typography variant="body2">•</Typography>
                                <Typography variant="body2">
                                  Atribuído para: {ticket.assignedTo}
                                </Typography>
                              </>
                            )}
                            <Typography variant="body2">•</Typography>
                            <Typography variant="body2">
                              Atualizado em: {ticket.updatedAt}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredTickets.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 