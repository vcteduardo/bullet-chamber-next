'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import Button from '@/components/Button';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de recuperação de senha
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          bgcolor: 'background.default',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Logo sx={{ width: 180, height: 48 }} />
          
          <Typography variant="h5" component="h1" textAlign="center" sx={{ mb: 1 }}>
            Email enviado!
          </Typography>
          
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Enviamos um email com instruções para redefinir sua senha.
            Por favor, verifique sua caixa de entrada.
          </Typography>

          <Button
            fullWidth
            size="large"
            customVariant="secondary"
            onClick={() => router.push('/login')}
            sx={{ mt: 2 }}
          >
            Voltar para o login
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Logo sx={{ width: 180, height: 48 }} />
        
        <Typography variant="h5" component="h1" textAlign="center" sx={{ mb: 1 }}>
          Esqueceu sua senha?
        </Typography>
        
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Digite seu email e enviaremos instruções para redefinir sua senha
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Enviar instruções
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <MuiLink
              href="/login"
              variant="body2"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Voltar para o login
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 