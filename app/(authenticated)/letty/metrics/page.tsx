'use client';

import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { StatCard } from '../../dashboard/components/StatCard';

// Dados mockados para métricas da Letty
const monthlyData = [
  { name: 'Jan', tickets: 150, resolvidos: 130, tempoMedio: 24 },
  { name: 'Fev', tickets: 180, resolvidos: 160, tempoMedio: 22 },
  { name: 'Mar', tickets: 160, resolvidos: 145, tempoMedio: 20 },
  { name: 'Abr', tickets: 200, resolvidos: 185, tempoMedio: 18 },
  { name: 'Mai', tickets: 220, resolvidos: 200, tempoMedio: 16 },
  { name: 'Jun', tickets: 190, resolvidos: 175, tempoMedio: 15 },
];

const ticketDistribution = [
  { name: 'Resolvidos', value: 65, color: '#10B981' },
  { name: 'Em Andamento', value: 25, color: '#F59E0B' },
  { name: 'Pendentes', value: 10, color: '#EF4444' },
];

const categoryData = [
  { name: 'Jan', suporte: 80, acesso: 40, infra: 30 },
  { name: 'Fev', suporte: 90, acesso: 45, infra: 45 },
  { name: 'Mar', suporte: 85, acesso: 35, infra: 40 },
  { name: 'Abr', suporte: 100, acesso: 50, infra: 50 },
  { name: 'Mai', suporte: 110, acesso: 55, infra: 55 },
  { name: 'Jun', suporte: 95, acesso: 45, infra: 50 },
];

export default function Metrics() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Métricas Letty
      </Typography>

      <Grid container spacing={3}>
        {/* Cards de Estatísticas */}
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Total de Tickets"
            value="190"
            trend={8}
            icon={ConfirmationNumberIcon}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Tempo Médio de Resposta"
            value="15min"
            trend={-12}
            icon={AccessTimeIcon}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Taxa de Resolução"
            value="92%"
            trend={5}
            icon={CheckCircleIcon}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Satisfação do Cliente"
            value="4.8"
            trend={3}
            icon={SupportAgentIcon}
          />
        </Grid>

        {/* Gráfico de Área - Volume de Tickets */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Volume de Tickets por Mês
            </Typography>
            <Box sx={{ height: 340 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="tickets"
                    name="Total de Tickets"
                    stroke="#8342F1"
                    fill="#BA9AFF"
                  />
                  <Area
                    type="monotone"
                    dataKey="resolvidos"
                    name="Tickets Resolvidos"
                    stroke="#10B981"
                    fill="#A7F3D0"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Gráfico de Pizza - Status dos Tickets */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Status dos Tickets
            </Typography>
            <Box sx={{ height: 340 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ticketDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Gráfico de Barras - Tickets por Categoria */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Tickets por Categoria
            </Typography>
            <Box sx={{ height: 340 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="suporte" name="Suporte" fill="#8342F1" />
                  <Bar dataKey="acesso" name="Acesso" fill="#10B981" />
                  <Bar dataKey="infra" name="Infraestrutura" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 