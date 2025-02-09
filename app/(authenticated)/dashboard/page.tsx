'use client';

import { Box, Grid, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import { DashboardCard } from '@/components/DashboardCard';

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total de Clientes"
            value="1,234"
            description="Últimos 30 dias"
            icon={PeopleIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Times Ativos"
            value="56"
            description="Times em operação"
            icon={GroupsIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Transações"
            value="R$ 1.2M"
            description="Volume mensal"
            icon={AttachMoneyIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Usuários Ativos"
            value="890"
            description="Acessos diários"
            icon={PersonIcon}
          />
        </Grid>
      </Grid>
    </Box>
  );
} 