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
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { StatCard } from './components/StatCard';

// Dados mockados
const monthlyData = [
  { name: 'Jan', contas: 40, depositos: 24000, saques: 18000 },
  { name: 'Fev', contas: 30, depositos: 28000, saques: 22000 },
  { name: 'Mar', contas: 45, depositos: 32000, saques: 25000 },
  { name: 'Abr', contas: 50, depositos: 35000, saques: 28000 },
  { name: 'Mai', contas: 35, depositos: 30000, saques: 24000 },
  { name: 'Jun', contas: 55, depositos: 38000, saques: 30000 },
];

const transactionDistribution = [
  { name: 'Depósitos', value: 60, color: '#10B981' },
  { name: 'Saques', value: 40, color: '#EF4444' },
];

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Cards de Estatísticas */}
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Total de Depósitos"
            value="R$ 38.000"
            trend={12}
            icon={AccountBalanceWalletIcon}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Total de Saques"
            value="R$ 30.000"
            trend={-8}
            icon={AccountBalanceWalletIcon}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Novas Contas"
            value="55"
            trend={15}
            icon={GroupAddIcon}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Taxa de Crescimento"
            value="15%"
            trend={5}
            icon={TrendingUpIcon}
          />
        </Grid>

        {/* Gráfico de Área - Contas Abertas */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Contas Abertas por Mês
            </Typography>
            <Box sx={{ height: 300 }}>
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
                    dataKey="contas"
                    stroke="#8342F1"
                    fill="#BA9AFF"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Gráfico de Pizza - Distribuição de Transações */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Distribuição de Transações
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transactionDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {transactionDistribution.map((entry, index) => (
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

        {/* Gráfico de Barras - Depósitos e Saques */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Volume de Depósitos e Saques
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="depositos" name="Depósitos" fill="#10B981" />
                  <Bar dataKey="saques" name="Saques" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 