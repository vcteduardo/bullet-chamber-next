'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Button from '@/components/Button';

interface Document {
  id: number;
  name: string;
  type: string;
  category: string;
  size: string;
  updatedAt: string;
}

const mockDocuments: Document[] = [
  {
    id: 1,
    name: 'Manual do Usuário',
    type: 'PDF',
    category: 'Manuais',
    size: '2.5 MB',
    updatedAt: '2024-02-15',
  },
  {
    id: 2,
    name: 'Política de Privacidade',
    type: 'DOC',
    category: 'Legal',
    size: '1.2 MB',
    updatedAt: '2024-02-14',
  },
  {
    id: 3,
    name: 'Guia de Instalação',
    type: 'PDF',
    category: 'Manuais',
    size: '3.7 MB',
    updatedAt: '2024-02-13',
  },
];

const categories = [
  { id: 1, name: 'Todos', count: 15 },
  { id: 2, name: 'Manuais', count: 5 },
  { id: 3, name: 'Legal', count: 3 },
  { id: 4, name: 'Tutoriais', count: 4 },
  { id: 5, name: 'Templates', count: 3 },
];

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredDocuments = mockDocuments.filter(doc =>
    (selectedCategory === 'Todos' || doc.category === selectedCategory) &&
    (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Documentos
        </Typography>
        <Button startIcon={<AddIcon />} size="large">
          Novo Documento
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Categorias
            </Typography>
            <List>
              {categories.map((category) => (
                <ListItemButton
                  key={category.id}
                  selected={selectedCategory === category.name}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <ListItemIcon>
                    <FolderIcon color={selectedCategory === category.name ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={category.name}
                    secondary={`${category.count} documentos`}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar documentos..."
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
              {filteredDocuments.map((doc) => (
                <ListItem
                  key={doc.id}
                  secondaryAction={
                    <Box>
                      <Button
                        customVariant="secondary"
                        size="small"
                        startIcon={<CloudDownloadIcon />}
                      >
                        Download
                      </Button>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.name}
                    secondary={
                      <Typography component="span" variant="body2" color="text.secondary">
                        <Chip label={doc.type} size="small" sx={{ mr: 1 }} />
                        <Typography component="span" variant="body2" color="text.secondary">
                          {doc.size}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                          •
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary">
                          Atualizado em {doc.updatedAt}
                        </Typography>
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 