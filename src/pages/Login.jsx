import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import vigilonLogo from '../assets/vigilon-logo.svg';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Chip,
  FormHelperText
} from '@mui/material';
import { FiUser, FiLock, FiEye, FiEyeOff, FiRadio, FiTerminal, FiCheck, FiShield } from 'react-icons/fi';

export default function Login() {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const [email, setEmail] = useState('analyst@vigilon.io');
  const [password, setPassword] = useState('Vigilon-SOC-2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const fullTagline = 'AI-Powered Threat Intelligence';
  const [typedTagline, setTypedTagline] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullTagline.length) {
        setTypedTagline(fullTagline.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setMousePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    setParallax({ x: ((x - centerX) / centerX) * -6, y: ((y - centerY) / centerY) * -6 });
  };

  const [passFocused, setPassFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');

    let hasErr = false;
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid clearance email address.');
      hasErr = true;
    }
    if (!password || password.length < 6) {
      setPasswordError('Clearance password must be at least 6 characters.');
      hasErr = true;
    }

    if (hasErr) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setError('Authentication failed. Verify credentials and clearance level.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 850);
    }, 500);
  };

  return (
    <Box
      onMouseMove={handleMouseMove}
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0D0F1A',
        backgroundImage: 'radial-gradient(at 10% 10%, rgba(34, 211, 238, 0.12) 0px, transparent 50%), radial-gradient(at 90% 90%, rgba(139, 92, 246, 0.12) 0px, transparent 50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: 2
      }}
    >
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper
          ref={cardRef}
          elevation={0}
          sx={{
            p: 4.5,
            backgroundColor: 'rgba(18, 17, 31, 0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 20px 50px rgba(34, 211, 238, 0.15)',
            border: '1px solid transparent',
            backgroundImage: 'linear-gradient(rgba(18, 17, 31, 0.88), rgba(18, 17, 31, 0.88)), linear-gradient(135deg, #22D3EE, #8B5CF6, #22D3EE)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            transform: isShaking ? 'translate3d(0, 0, 0)' : 'none',
            animation: isShaking ? 'cardShake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both' : 'none',
            '@keyframes cardShake': {
              '10%, 90%': { transform: 'translate3d(-4px, 0, 0)' },
              '20%, 80%': { transform: 'translate3d(6px, 0, 0)' },
              '30%, 50%, 70%': { transform: 'translate3d(-8px, 0, 0)' },
              '40%, 60%': { transform: 'translate3d(8px, 0, 0)' }
            },
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none !important',
              transform: 'none !important'
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              borderRadius: 'inherit',
              opacity: 0.35,
              background: `radial-gradient(350px circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.25), transparent 70%)`
            }
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #22D3EE, #8B5CF6, transparent)',
              opacity: 0.7,
              animation: 'scanlineSweep 8s infinite linear',
              '@keyframes scanlineSweep': {
                '0%': { transform: 'translateY(-10px)' },
                '100%': { transform: 'translateY(520px)' }
              },
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none'
              }
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3.5,
              transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0px)`,
              transition: 'transform 0.1s ease-out',
              '@media (prefers-reduced-motion: reduce)': {
                transform: 'none !important'
              }
            }}
          >
            <Box
              component="img"
              src={vigilonLogo}
              alt="Vigilon Logo Mark"
              sx={{
                width: 68,
                height: 68,
                filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.7))',
                mb: 1.8
              }}
            />

            <Typography variant="h4" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.03em' }}>
              Vigilon
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: '#22D3EE',
                mt: 0.6,
                fontWeight: 700,
                letterSpacing: '0.6px',
                minHeight: '22px',
                fontFamily: '"Sora", sans-serif'
              }}
            >
              {typedTagline}
              <span style={{ opacity: typedTagline.length < fullTagline.length ? 1 : 0 }}>|</span>
            </Typography>

            <Chip
              icon={<FiRadio size={12} color="#22D3EE" />}
              label="RESTRICTED ANALYST CONSOLE"
              size="small"
              sx={{
                mt: 2,
                backgroundColor: 'rgba(34, 211, 238, 0.1)',
                color: '#22D3EE',
                border: '1px solid rgba(34, 211, 238, 0.35)',
                fontWeight: 800,
                fontSize: '0.65rem'
              }}
            />
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#F87171',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                boxShadow: '0 0 18px rgba(239, 68, 68, 0.3)'
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.8 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Analyst Email / Clearance ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(emailError)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start" sx={{ mr: 1.5 }}>
                          <FiUser color="#22D3EE" />
                        </InputAdornment>
                      )
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(13, 15, 26, 0.75)',
                      borderRadius: '12px',
                      '&.Mui-focused': {
                        boxShadow: '0 0 16px rgba(34, 211, 238, 0.35)',
                        borderColor: '#22D3EE'
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#E2E8F0',
                      paddingLeft: '4px'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#94A3B8'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#22D3EE'
                    }
                  }}
                />
                {emailError && <FormHelperText error>{emailError}</FormHelperText>}
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Clearance Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                  error={Boolean(passwordError)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start" sx={{ mr: 1.5 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              transform: passFocused ? 'rotate(-15deg) scale(1.2)' : 'rotate(0deg) scale(1)',
                              color: passFocused ? '#22D3EE' : '#8B5CF6',
                              transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.25s ease'
                            }}
                          >
                            <FiLock size={18} />
                          </Box>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#94A3B8' }}>
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(13, 15, 26, 0.75)',
                      borderRadius: '12px',
                      '&.Mui-focused': {
                        boxShadow: '0 0 16px rgba(139, 92, 246, 0.35)',
                        borderColor: '#8B5CF6'
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#E2E8F0',
                      paddingLeft: '4px'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#94A3B8'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#8B5CF6'
                    }
                  }}
                />
                {passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                startIcon={isSuccess ? <FiCheck size={20} color="#0D0F1A" /> : null}
                sx={{
                  py: 1.6,
                  mt: 0.5,
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  fontFamily: '"Sora", sans-serif',
                  background: isSuccess
                    ? 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'
                    : 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                  color: '#0D0F1A',
                  boxShadow: isSuccess
                    ? '0 0 30px rgba(16, 185, 129, 0.6)'
                    : '0 0 20px rgba(34, 211, 238, 0.35)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: isSuccess
                      ? 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'
                      : 'linear-gradient(135deg, #38BDF8 0%, #7C3AED 100%)',
                    boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)'
                  }
                }}
              >
                {isSuccess
                  ? 'ACCESS GRANTED - INITIALIZING CONSOLE...'
                  : loading
                    ? 'Authenticating Credentials...'
                    : 'Sign In to Vigilon Console'}
              </Button>
            </Box>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center', borderTop: '1px solid rgba(34, 211, 238, 0.12)', pt: 2.2 }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontSize: '0.72rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.6 }}>
              <FiTerminal size={12} color="#22D3EE" /> (c) 2026 Vigilon - Threat Intelligence Platform
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}