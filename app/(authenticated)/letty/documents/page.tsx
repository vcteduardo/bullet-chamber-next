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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

interface NewDocument {
  name: string;
  category: string;
  file: File | null;
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
  const [openNewDocumentModal, setOpenNewDocumentModal] = useState(false);
  const [newDocument, setNewDocument] = useState<NewDocument>({
    name: '',
    category: '',
    file: null,
  });

  const handleOpenModal = () => setOpenNewDocumentModal(true);
  const handleCloseModal = () => {
    setOpenNewDocumentModal(false);
    setNewDocument({ name: '', category: '', file: null });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setNewDocument(prev => ({ ...prev, file }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você implementará a lógica para salvar o documento
    console.log('Novo documento:', newDocument);
    handleCloseModal();
  };

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
        <Button startIcon={<AddIcon />} size="large" onClick={handleOpenModal}>
          Novo Documento
        </Button>
      </Box>

      {/* Modal de Novo Documento */}
      <Dialog open={openNewDocumentModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Novo Documento</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Nome do Documento"
                fullWidth
                required
                value={newDocument.name}
                onChange={(e) => setNewDocument(prev => ({ ...prev, name: e.target.value }))}
              />
              
              <FormControl fullWidth required>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={newDocument.category}
                  label="Categoria"
                  onChange={(e) => setNewDocument(prev => ({ ...prev, category: e.target.value }))}
                >
                  {categories.filter(cat => cat.name !== 'Todos').map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                customVariant="secondary"
                component="label"
                startIcon={<CloudDownloadIcon />}
                sx={{ mt: 1 }}
              >
                Selecionar Arquivo
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                />
              </Button>
              {newDocument.file && (
                <Typography variant="body2" color="text.secondary">
                  Arquivo selecionado: {newDocument.file.name}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button customVariant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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