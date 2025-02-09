'use client';

import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useState } from 'react';

// Componente placeholder para os gráficos
// Em produção, você usaria uma biblioteca como recharts, nivo, ou chart.js
const ChartPlaceholder = ({ title }: { title: string }) => (
  <Paper
    sx={{
      p: 3,
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'background.default',
    }}
  >
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Box
      sx={{
        width: '100%',
        height: '200px',
        bgcolor: 'background.paper',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography color="text.secondary">
        Gráfico de {title}
      </Typography>
    </Box>
  </Paper>
);

const StatCard = ({ title, value, description }: { title: string; value: string; description: string }) => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h4" sx={{ mb: 1 }}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

export default function Metrics() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Métricas
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Período</InputLabel>
          <Select
            value={timeRange}
            label="Período"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="24h">Últimas 24h</MenuItem>
            <MenuItem value="7d">Últimos 7 dias</MenuItem>
            <MenuItem value="30d">Últimos 30 dias</MenuItem>
            <MenuItem value="90d">Últimos 90 dias</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Chamados"
            value="1,234"
            description="Aumento de 12% em relação ao período anterior"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tempo Médio de Resposta"
            value="2.5h"
            description="Redução de 15% em relação ao período anterior"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Taxa de Resolução"
            value="94%"
            description="Aumento de 3% em relação ao período anterior"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Satisfação do Cliente"
            value="4.8"
            description="Baseado em 856 avaliações"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ChartPlaceholder title="Chamados por Período" />
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartPlaceholder title="Distribuição por Status" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder title="Tempo de Resolução" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder title="Categorias de Chamados" />
        </Grid>
      </Grid>
    </Box>
  );
} 