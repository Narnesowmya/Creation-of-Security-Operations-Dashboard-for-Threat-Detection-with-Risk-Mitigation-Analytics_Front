import { createTheme } from '@mui/material/styles';
import { SEVERITY_COLORS, STATUS_COLORS } from './socTheme';

export { SEVERITY_COLORS, STATUS_COLORS };

export const createAppTheme = (mode = 'dark') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      background: {
        default: isDark ? '#0D0F1A' : '#F8FAFC',
        paper: isDark ? 'rgba(18, 17, 31, 0.75)' : '#FFFFFF',
        alt: isDark ? '#141326' : '#F1F5F9',
      },
      primary: {
        main: isDark ? '#22D3EE' : '#0284C7',
        light: isDark ? '#67E8F9' : '#38BDF8',
        dark: isDark ? '#0891B2' : '#0369A1',
      },
      secondary: {
        main: isDark ? '#8B5CF6' : '#7C3AED',
        light: isDark ? '#A78BFA' : '#8B5CF6',
        dark: isDark ? '#6D28D9' : '#5B21B6',
      },
      error: {
        main: '#EF4444',
      },
      warning: {
        main: '#F97316',
      },
      info: {
        main: isDark ? '#22D3EE' : '#0284C7',
      },
      success: {
        main: '#10B981',
      },
      text: {
        primary: isDark ? '#F8FAFC' : '#0F172A',
        secondary: isDark ? '#94A3B8' : '#475569',
        disabled: isDark ? '#64748B' : '#94A3B8',
      },
      divider: isDark ? 'rgba(34, 211, 238, 0.12)' : 'rgba(15, 23, 42, 0.12)',
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
      body2: { fontSize: '0.85rem' },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? '#0D0F1A' : '#F8FAFC',
            backgroundImage: isDark
              ? 'radial-gradient(at 10% 10%, rgba(34, 211, 238, 0.07) 0px, transparent 50%), radial-gradient(at 90% 90%, rgba(139, 92, 246, 0.07) 0px, transparent 50%)'
              : 'radial-gradient(at 10% 10%, rgba(2, 132, 199, 0.05) 0px, transparent 50%), radial-gradient(at 90% 90%, rgba(124, 58, 237, 0.05) 0px, transparent 50%)',
            color: isDark ? '#F8FAFC' : '#0F172A',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDark ? '#0D0F1A' : '#F8FAFC',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDark ? 'rgba(34, 211, 238, 0.2)' : 'rgba(2, 132, 199, 0.2)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: isDark ? 'rgba(34, 211, 238, 0.4)' : 'rgba(2, 132, 199, 0.4)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: isDark ? 'rgba(18, 17, 31, 0.75)' : '#FFFFFF',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: isDark ? '1px solid rgba(34, 211, 238, 0.15)' : '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.4)' : '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: '10px',
            fontFamily: '"Sora", sans-serif',
          },
          containedPrimary: {
            background: isDark
              ? 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)'
              : 'linear-gradient(135deg, #0284C7 0%, #7C3AED 100%)',
            color: isDark ? '#0D0F1A' : '#FFFFFF',
            boxShadow: isDark
              ? '0 0 20px rgba(34, 211, 238, 0.35)'
              : '0 4px 14px rgba(2, 132, 199, 0.3)',
            '&:hover': {
              background: isDark
                ? 'linear-gradient(135deg, #38BDF8 0%, #7C3AED 100%)'
                : 'linear-gradient(135deg, #0369A1 0%, #6D28D9 100%)',
              boxShadow: isDark
                ? '0 0 25px rgba(34, 211, 238, 0.5)'
                : '0 6px 20px rgba(2, 132, 199, 0.4)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            borderRadius: '8px',
          },
        },
      },
    },
  });
};
