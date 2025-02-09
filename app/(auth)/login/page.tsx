'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import Button from '@/components/Button';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Aqui você implementaria a lógica de autenticação com sua API
      // Por enquanto, vamos apenas simular um delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Após autenticação bem-sucedida, redireciona para o dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setLoading(false);
    }
  };

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
          Bem-vindo de volta!
        </Typography>
        
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Entre com suas credenciais para acessar sua conta
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
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <MuiLink
              href="/forgot-password"
              variant="body2"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Esqueceu sua senha?
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 