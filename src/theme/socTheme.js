import { createTheme } from '@mui/material/styles';

// "Cyber Obsidian" Theme Color System
export const SEVERITY_COLORS = {
  Critical: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#991B1B',
    bg: 'rgba(239, 68, 68, 0.12)',
    border: 'rgba(239, 68, 68, 0.5)',
    glow: '0 0 16px rgba(239, 68, 68, 0.35)'
  },
  High: {
    main: '#F97316',
    light: '#FB923C',
    dark: '#9A3412',
    bg: 'rgba(249, 115, 22, 0.12)',
    border: 'rgba(249, 115, 22, 0.5)',
    glow: '0 0 16px rgba(249, 115, 22, 0.35)'
  },
  Medium: {
    main: '#FBBF24',
    light: '#FCD34D',
    dark: '#92400E',
    bg: 'rgba(251, 191, 36, 0.12)',
    border: 'rgba(251, 191, 36, 0.5)',
    glow: '0 0 16px rgba(251, 191, 36, 0.35)'
  },
  Low: {
    main: '#10B981',
    light: '#34D399',
    dark: '#065F46',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.5)',
    glow: '0 0 16px rgba(16, 185, 129, 0.35)'
  }
};

export const STATUS_COLORS = {
  Open: {
    main: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.5)'
  },
  Investigating: {
    main: '#22D3EE',
    bg: 'rgba(34, 211, 238, 0.15)',
    border: 'rgba(34, 211, 238, 0.5)'
  },
  Resolved: {
    main: '#10B981',
    bg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.5)'
  },
  Closed: {
    main: '#64748B',
    bg: 'rgba(100, 116, 139, 0.15)',
    border: 'rgba(100, 116, 139, 0.5)'
  }
};

export const socTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0D0F1A',
      paper: 'rgba(18, 17, 31, 0.75)',
      alt: '#141326'
    },
    primary: {
      main: '#22D3EE',   // Electric Cyan
      light: '#67E8F9',
      dark: '#0891B2'
    },
    secondary: {
      main: '#8B5CF6',   // Violet
      light: '#A78BFA',
      dark: '#6D28D9'
    },
    error: {
      main: '#EF4444'
    },
    warning: {
      main: '#F97316'
    },
    info: {
      main: '#22D3EE'
    },
    success: {
      main: '#10B981'
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      disabled: '#64748B'
    },
    divider: 'rgba(34, 211, 238, 0.12)'
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Sora", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Sora", sans-serif', fontWeight: 800 },
    h3: { fontFamily: '"Sora", sans-serif', fontWeight: 800 },
    h4: { fontFamily: '"Sora", sans-serif', fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontFamily: '"Sora", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
    subtitle1: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
    subtitle2: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
    body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
    body2: { fontSize: '0.85rem' }
  },
  shape: {
    borderRadius: 14
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0D0F1A',
          backgroundImage: 'radial-gradient(at 10% 10%, rgba(34, 211, 238, 0.07) 0px, transparent 50%), radial-gradient(at 90% 90%, rgba(139, 92, 246, 0.07) 0px, transparent 50%)',
          color: '#F8FAFC',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: '#0D0F1A'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(34, 211, 238, 0.2)',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(34, 211, 238, 0.4)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(18, 17, 31, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(34, 211, 238, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: '10px',
          fontFamily: '"Sora", sans-serif'
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
          color: '#0D0F1A',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #38BDF8 0%, #7C3AED 100%)',
            boxShadow: '0 0 25px rgba(34, 211, 238, 0.5)'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: '8px'
        }
      }
    }
  }
});
