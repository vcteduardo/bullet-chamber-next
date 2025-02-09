'use client';

import { Box, Paper, Typography } from '@mui/material';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
}

export const DashboardCard = ({ title, value, description, icon: Icon }: DashboardCardProps) => {
  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
        </Box>
      </Box>
      <Typography color="text.secondary" variant="body2">
        {description}
      </Typography>
    </Paper>
  );
}; 