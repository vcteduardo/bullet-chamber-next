'use client';

import { Box, Paper, Typography } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  icon: SvgIconComponent;
}

export function StatCard({ title, value, trend, icon: Icon }: StatCardProps) {
  return (
    <Paper sx={{ p: 3, height: 140 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: 'primary.light',
            color: 'primary.main',
            mr: 2,
          }}
        >
          <Icon sx={{ fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {value}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {trend > 0 ? (
          <TrendingUpIcon sx={{ color: 'success.main' }} fontSize="small" />
        ) : (
          <TrendingDownIcon sx={{ color: 'error.main' }} fontSize="small" />
        )}
        {Math.abs(trend)}% em relação ao mês anterior
      </Typography>
    </Paper>
  );
} 