'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  AvatarGroup,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import Button from '@/components/Button';

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
}

interface Team {
  id: number;
  name: string;
  description: string;
  members: TeamMember[];
  status: string;
}

const mockTeams: Team[] = [
  {
    id: 1,
    name: 'Time de Desenvolvimento',
    description: 'Equipe responsável pelo desenvolvimento de software',
    members: [
      { id: 1, name: 'João Silva', avatar: '/avatars/1.jpg' },
      { id: 2, name: 'Maria Santos', avatar: '/avatars/2.jpg' },
      { id: 3, name: 'Pedro Costa', avatar: '/avatars/3.jpg' },
    ],
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Time de Design',
    description: 'Equipe responsável pelo design de interfaces',
    members: [
      { id: 4, name: 'Ana Oliveira', avatar: '/avatars/4.jpg' },
      { id: 5, name: 'Carlos Souza', avatar: '/avatars/5.jpg' },
    ],
    status: 'Ativo',
  },
  // Adicione mais times mock aqui
];

export default function Teams() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = mockTeams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Times
        </Typography>
        <Button startIcon={<AddIcon />} size="large">
          Novo Time
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar times..."
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

      <Grid container spacing={3}>
        {filteredTeams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <GroupsIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {team.name}
                    </Typography>
                    <Chip
                      label={team.status}
                      color={team.status === 'Ativo' ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </Box>
                <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
                  {team.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AvatarGroup max={4}>
                    {team.members.map((member) => (
                      <Avatar key={member.id} alt={member.name} src={member.avatar} />
                    ))}
                  </AvatarGroup>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {team.members.length} membros
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button customVariant="secondary" size="small">Ver Detalhes</Button>
                <Button customVariant="secondary" size="small">Editar</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 