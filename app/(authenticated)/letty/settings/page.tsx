'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  TextField,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@/components/Button';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Settings() {
  const [tabValue, setTabValue] = useState(0);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    dailyDigest: false,
    weeklyReport: true,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Configurações
      </Typography>

      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="configurações"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Geral" />
          <Tab label="Notificações" />
          <Tab label="Integrações" />
          <Tab label="Aparência" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Informações da Empresa
              </Typography>
              <TextField
                fullWidth
                label="Nome da Empresa"
                defaultValue="Bullet Chamber"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email de Contato"
                defaultValue="contato@bulletchamber.com"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Telefone"
                defaultValue="(11) 99999-9999"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Configurações Regionais
              </Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel>Fuso Horário</InputLabel>
                <Select
                  defaultValue="America/Sao_Paulo"
                  label="Fuso Horário"
                >
                  <MenuItem value="America/Sao_Paulo">Brasília (GMT-3)</MenuItem>
                  <MenuItem value="America/New_York">Nova York (GMT-5)</MenuItem>
                  <MenuItem value="Europe/London">Londres (GMT)</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Formato de Data</InputLabel>
                <Select
                  defaultValue="dd/MM/yyyy"
                  label="Formato de Data"
                >
                  <MenuItem value="dd/MM/yyyy">DD/MM/AAAA</MenuItem>
                  <MenuItem value="MM/dd/yyyy">MM/DD/AAAA</MenuItem>
                  <MenuItem value="yyyy-MM-dd">AAAA-MM-DD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Preferências de Notificação
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.emailNotifications}
                  onChange={handleNotificationChange}
                  name="emailNotifications"
                />
              }
              label="Notificações por Email"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.pushNotifications}
                  onChange={handleNotificationChange}
                  name="pushNotifications"
                />
              }
              label="Notificações Push"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.dailyDigest}
                  onChange={handleNotificationChange}
                  name="dailyDigest"
                />
              }
              label="Resumo Diário"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.weeklyReport}
                  onChange={handleNotificationChange}
                  name="weeklyReport"
                />
              }
              label="Relatório Semanal"
            />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Integrações Disponíveis
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">Slack</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Integração com canais do Slack para notificações
                    </Typography>
                  </Box>
                  <Button customVariant="secondary">Configurar</Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">Microsoft Teams</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Integração com equipes do Microsoft Teams
                    </Typography>
                  </Box>
                  <Button customVariant="secondary">Configurar</Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Personalização da Interface
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tema</InputLabel>
                <Select
                  defaultValue="light"
                  label="Tema"
                >
                  <MenuItem value="light">Claro</MenuItem>
                  <MenuItem value="dark">Escuro</MenuItem>
                  <MenuItem value="system">Sistema</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Densidade</InputLabel>
                <Select
                  defaultValue="comfortable"
                  label="Densidade"
                >
                  <MenuItem value="comfortable">Confortável</MenuItem>
                  <MenuItem value="compact">Compacto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </TabPanel>

        <Divider />
        
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button startIcon={<SaveIcon />} size="large">
            Salvar Alterações
          </Button>
        </Box>
      </Paper>
    </Box>
  );
} 