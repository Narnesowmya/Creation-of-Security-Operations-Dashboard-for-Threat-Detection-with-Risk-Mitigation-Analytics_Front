import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import vigilonLogo from '../assets/vigilon-logo.svg';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  FiGrid,
  FiAlertTriangle,
  FiShield,
  FiZap,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiCpu
} from 'react-icons/fi';

const NAV_ITEMS = [
  { label: 'Overview', path: '/dashboard', icon: FiGrid },
  { label: 'Security Events', path: '/dashboard/events', icon: FiAlertTriangle, badge: 'LIVE' },
  { label: 'Threat Intelligence', path: '/dashboard/threat-intel', icon: FiShield },
  { label: 'Vulnerabilities', path: '/dashboard/vulnerabilities', icon: FiZap },
  { label: 'Analytics', path: '/dashboard/analytics', icon: FiBarChart2 },
  { label: 'Correlation', path: '/dashboard/correlation', icon: FiZap }
];

export default function Sidebar({ mobileOpen, handleDrawerToggle, collapsed, setCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerWidth = collapsed ? 80 : 270;

  const handleNavClick = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(13, 15, 26, 0.88)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(34, 211, 238, 0.15)',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflowX: 'hidden'
      }}
    >
      {/* Sidebar Brand Header */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.8,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/dashboard')}
        >
          <Box
            component="img"
            src={vigilonLogo}
            alt="Vigilon Logo"
            sx={{
              width: 36,
              height: 36,
              filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.6))',
              flexShrink: 0
            }}
          />
          {!collapsed && (
            <Box>
              <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', lineHeight: 1.1, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
                Vigilon
              </Typography>
              <Typography variant="caption" sx={{ color: '#22D3EE', letterSpacing: '0.6px', fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase' }}>
                Threat Intelligence
              </Typography>
            </Box>
          )}
        </Box>

        {!isMobile && (
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{
              color: '#94A3B8',
              '&:hover': { color: '#22D3EE', backgroundColor: 'rgba(34, 211, 238, 0.1)' }
            }}
          >
            {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </IconButton>
        )}
      </Box>

      <Divider sx={{ borderColor: 'rgba(34, 211, 238, 0.12)', my: 1 }} />

      {/* Navigation Links */}
      <List sx={{ px: 1.5, py: 1, flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1.2 }}>
              <Tooltip title={collapsed ? item.label : ''} placement="right">
                <ListItemButton
                  onClick={() => handleNavClick(item.path)}
                  sx={{
                    borderRadius: '12px',
                    minHeight: 48,
                    px: collapsed ? 2 : 2.2,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    backgroundColor: isActive ? 'rgba(34, 211, 238, 0.12)' : 'transparent',
                    color: isActive ? '#22D3EE' : '#94A3B8',
                    borderLeft: isActive ? '3px solid #22D3EE' : '3px solid transparent',
                    borderRight: isActive ? '1px solid rgba(34, 211, 238, 0.25)' : '1px solid transparent',
                    boxShadow: isActive ? '0 0 15px rgba(34, 211, 238, 0.2)' : 'none',
                    '&:hover': {
                      backgroundColor: isActive ? 'rgba(34, 211, 238, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: '#F8FAFC',
                      '& .nav-icon': { transform: 'scale(1.12)', color: '#22D3EE' }
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ListItemIcon
                    className="nav-icon"
                    sx={{
                      minWidth: collapsed ? 0 : 40,
                      mr: collapsed ? 0 : 1,
                      justifyContent: 'center',
                      color: isActive ? '#22D3EE' : '#94A3B8',
                      transition: 'transform 0.2s ease, color 0.2s ease'
                    }}
                  >
                    <Icon size={20} />
                  </ListItemIcon>

                  {!collapsed && (
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: {
                          sx: {
                            fontFamily: '"Sora", sans-serif',
                            fontSize: '0.9rem',
                            fontWeight: isActive ? 700 : 500
                          }
                        }
                      }}
                    />
                  )}

                  {!collapsed && item.badge && (
                    <Box
                      sx={{
                        px: 1,
                        py: 0.2,
                        borderRadius: '6px',
                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                        color: '#EF4444',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        border: '1px solid rgba(239, 68, 68, 0.4)'
                      }}
                    >
                      {item.badge}
                    </Box>
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      {/* Vigilon Active Engine Widget */}
      {!collapsed && (
        <Box
          sx={{
            m: 2,
            p: 2,
            borderRadius: '12px',
            backgroundColor: 'rgba(18, 17, 31, 0.7)',
            border: '1px solid rgba(34, 211, 238, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#22D3EE',
              boxShadow: '0 0 12px #22D3EE'
            }}
          />
          <Box>
            <Typography variant="caption" sx={{ color: '#22D3EE', fontWeight: 800, display: 'block', lineHeight: 1, textTransform: 'uppercase' }}>
              Vigilon Engine v5.2
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.68rem' }}>
              AI-Powered Threat Intelligence
            </Typography>
          </Box>
        </Box>
      )}

      <Divider sx={{ borderColor: 'rgba(34, 211, 238, 0.12)' }} />

      {/* Logout Action */}
      <Box sx={{ p: 1.5 }}>
        <Tooltip title={collapsed ? 'Sign Out' : ''} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: '12px',
              minHeight: 46,
              color: '#94A3B8',
              justifyContent: collapsed ? 'center' : 'flex-start',
              '&:hover': {
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#EF4444'
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, color: 'inherit' }}>
              <FiLogOut size={20} />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Sign Out"
                slotProps={{
                  primary: {
                    sx: { fontFamily: '"Sora", sans-serif', fontSize: '0.88rem', fontWeight: 600 }
                  }
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, transition: 'width 0.3s ease' }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        slotProps={{ root: { keepMounted: true } }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 270 }
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            transition: 'width 0.3s ease',
            borderRight: 'none'
          }
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}