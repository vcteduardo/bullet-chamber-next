'use client';

import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Logo } from '@/components/Logo';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { text: 'Clientes', icon: PeopleIcon, path: '/clients' },
  { text: 'Times', icon: GroupsIcon, path: '/teams' },
  { text: 'Usuários', icon: PersonIcon, path: '/users' },
];

const lettyMenuItems = [
  { text: 'Métricas', icon: BarChartIcon, path: '/letty/metrics' },
  { text: 'Documentos', icon: DescriptionIcon, path: '/letty/documents' },
  { text: 'Tickets', icon: ConfirmationNumberIcon, path: '/letty/tickets' },
  { text: 'Configurações', icon: SettingsIcon, path: '/letty/settings' },
];

const mockUser = {
  name: 'João Silva',
  email: 'joao.silva@exemplo.com',
  role: 'Administrador',
  avatar: '/avatars/1.jpg',
};

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lettyOpen, setLettyOpen] = useState(true);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLettyClick = () => {
    setLettyOpen(!lettyOpen);
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ px: 2 }}>
        <Logo sx={{ width: 150, height: 40 }} />
      </Toolbar>

      <List sx={{ px: 2, flex: 1 }}>
        {menuItems.map((item) => (
          <Link key={item.text} href={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton
              selected={pathname === item.path}
              sx={{
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'common.white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'common.white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        ))}

        <ListItemButton
          onClick={handleLettyClick}
          sx={{
            mb: 0.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <ConfirmationNumberIcon />
          </ListItemIcon>
          <ListItemText primary="Letty" />
          {lettyOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={lettyOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {lettyMenuItems.map((item) => (
              <Link key={item.text} href={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton
                  selected={pathname.startsWith(item.path)}
                  sx={{
                    pl: 4,
                    mb: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'common.white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'common.white',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
      </List>

      <Divider sx={{ mx: 2 }} />
      
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar
            src={mockUser.avatar}
            alt={mockUser.name}
            sx={{ width: 40, height: 40 }}
          >
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" noWrap>
              {mockUser.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {mockUser.role}
            </Typography>
          </Box>
        </Box>
        <ListItemButton
          sx={{
            mb: 0.5,
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'error.lighter',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header
        onMenuClick={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
              mt: '64px',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              mt: '64px',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '40px',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
} 