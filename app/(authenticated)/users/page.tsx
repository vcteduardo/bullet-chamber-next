'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@/components/Button';
import NewDocumentForm from '@/components/NewDocumentForm';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    role: 'Administrador',
    status: 'Ativo',
    avatar: '/avatars/1.jpg',
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@exemplo.com',
    role: 'Usuário',
    status: 'Ativo',
    avatar: '/avatars/2.jpg',
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro.costa@exemplo.com',
    role: 'Usuário',
    status: 'Inativo',
    avatar: '/avatars/3.jpg',
  },
  // Adicione mais usuários mock aqui
];

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Usuários
        </Typography>
        <Button startIcon={<AddIcon />} size="large">
          Novo Usuário
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar usuários..."
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
      </Box>

      <Paper>
        <List>
          {filteredUsers.map((user, index) => (
            <Box key={user.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={user.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <Box component="span" sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                      <Box component="span">
                        <Chip
                          label={user.role}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                      <Box component="span">
                        <Chip
                          label={user.status}
                          size="small"
                          color={user.status === 'Ativo' ? 'success' : 'default'}
                        />
                      </Box>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < filteredUsers.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>

      <NewDocumentForm />
    </Box>
  );
};

export default UsersPage; 