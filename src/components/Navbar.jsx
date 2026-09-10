import React, { useState } from 'react';
import vigilonLogo from '../assets/vigilon-logo.svg';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Button,
  Tooltip
} from '@mui/material';
import {
  FiMenu,
  FiBell,
  FiZap,
  FiUser,
  FiSettings,
  FiLogOut,
  FiShield
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ handleDrawerToggle }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(13, 15, 26, 0.88)',
        borderBottom: '1px solid rgba(34, 211, 238, 0.15)',
        backdropFilter: 'blur(16px)',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 }, minHeight: 68 }}>
        {/* Left: Mobile Toggle & Brand Logo/Wordmark */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, color: '#94A3B8' }}
          >
            <FiMenu size={22} />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
            <Box
              component="img"
              src={vigilonLogo}
              alt="Vigilon Brand Logo"
              sx={{ width: 34, height: 34, filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.6))' }}
            />
            <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em', fontSize: '1.25rem' }}>
              Vigilon
            </Typography>
          </Box>
        </Box>

        {/* Center-Right: Genuine Multi-Ring CSS Ripple Live "System Status" Indicator */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.8 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 0.8,
              borderRadius: '20px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.15)'
            }}
          >
            {/* Multi-Ring Pulsing Node (VFX 3) */}
            <Box sx={{ position: 'relative', width: 12, height: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 10px #10B981',
                  zIndex: 2
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  border: '2px solid #10B981',
                  opacity: 0.8,
                  animation: 'ripplePulse 2s infinite cubic-bezier(0, 0.2, 0.8, 1)',
                  '@keyframes ripplePulse': {
                    '0%': { transform: 'scale(0.5)', opacity: 1 },
                    '100%': { transform: 'scale(1.8)', opacity: 0 }
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    animation: 'none'
                  }
                }}
              />
            </Box>

            <Typography variant="caption" sx={{ fontFamily: '"Sora", sans-serif', color: '#10B981', fontWeight: 800, letterSpacing: '0.5px' }}>
              SYSTEM STATUS: ALL SYSTEMS MONITORED
            </Typography>
          </Box>
        </Box>

        {/* Far Right: Action Controls & Analyst Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Notifications */}
          <Tooltip title="Threat Notifications">
            <IconButton
              sx={{
                color: '#94A3B8',
                '&:hover': { color: '#22D3EE', backgroundColor: 'rgba(34, 211, 238, 0.1)' }
              }}
            >
              <Badge badgeContent={5} color="error">
                <FiBell size={20} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile Avatar */}
          <Box
            onClick={handleProfileClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              cursor: 'pointer',
              p: 0.5,
              px: 1.2,
              borderRadius: '10px',
              backgroundColor: 'rgba(18, 17, 31, 0.7)',
              border: '1px solid rgba(34, 211, 238, 0.2)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(34, 211, 238, 0.15)',
                borderColor: 'rgba(34, 211, 238, 0.4)'
              }
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                backgroundColor: '#22D3EE',
                color: '#0D0F1A',
                fontWeight: 800,
                fontSize: '0.88rem',
                border: '2px solid #8B5CF6'
              }}
            >
              AV
            </Avatar>
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Typography variant="body2" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', lineHeight: 1.1 }}>
                Alex Vance
              </Typography>
              <Typography variant="caption" sx={{ color: '#22D3EE', fontSize: '0.7rem', fontWeight: 600 }}>
                Lead SOC Commander
              </Typography>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                backgroundColor: '#141326',
                border: '1px solid rgba(34, 211, 238, 0.2)',
                minWidth: 190,
                mt: 1.5
              }
            }}
          >
            <MenuItem onClick={handleClose} sx={{ color: '#F8FAFC', gap: 1.5 }}>
              <FiUser size={16} color="#22D3EE" /> Analyst Profile
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ color: '#F8FAFC', gap: 1.5 }}>
              <FiSettings size={16} color="#8B5CF6" /> Vigilon Settings
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate('/login'); }} sx={{ color: '#EF4444', gap: 1.5 }}>
              <FiLogOut size={16} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
