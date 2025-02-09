'use client';

import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Divider,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
  drawerWidth: number;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const getBreadcrumb = () => {
    const paths = pathname.split('/').filter(Boolean);
    const isLettyRoute = paths[0] === 'letty';
    const currentSection = isLettyRoute ? 'Letty' : 'Time';
    const currentPage = paths[paths.length - 1];

    const formatPageName = (name: string) => {
      if (!name) return 'Dashboard';
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" color="text.secondary">
          {currentSection}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mx: 1 }}>
          {'>'}
        </Typography>
        <Typography variant="subtitle2" color="text.primary">
          {formatPageName(currentPage)}
        </Typography>
      </Box>
    );
  };

  const mockNotifications = [
    {
      id: 1,
      title: 'Novo ticket criado',
      description: 'Um novo ticket foi atribuído a você',
      time: '5 min atrás',
    },
    {
      id: 2,
      title: 'Atualização de sistema',
      description: 'Nova versão disponível para atualização',
      time: '1 hora atrás',
    },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ px: '24px !important' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {getBreadcrumb()}

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Última atualização em 05/02 às 09:05
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={handleNotificationsMenuOpen}
            >
              <Badge badgeContent={mockNotifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="User Avatar"
                src="/avatars/1.jpg"
              />
            </IconButton>
          </Box>
        </Box>

        {/* Menu de Notificações */}
        <Menu
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={handleNotificationsMenuClose}
          PaperProps={{
            sx: { width: 320, maxHeight: 400, borderRadius: 0 },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Typography variant="subtitle1" sx={{ p: 2, pb: 1 }}>
            Notificações
          </Typography>
          <Divider />
          {mockNotifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleNotificationsMenuClose}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="subtitle2">{notification.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {notification.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Menu de Perfil */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { width: 220, borderRadius: 0 },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1">João Silva</Typography>
            <Typography variant="body2" color="text.secondary">
              joao.silva@exemplo.com
            </Typography>
          </Box>
          <Divider />
          <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Meu Perfil
            </MenuItem>
          </Link>
          <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>
          </Link>
          <Divider />
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
} 