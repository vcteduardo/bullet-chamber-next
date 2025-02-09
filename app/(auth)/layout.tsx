'use client';

import { Box } from '@mui/material';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #6A26CD 0%, #8342F1 35%, #8342F1 70%, #5977FF 100%)',
      }}
    >
      {children}
    </Box>
  );
} 