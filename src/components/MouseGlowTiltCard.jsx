import React, { useState, useRef } from 'react';
import { Box } from '@mui/material';

export default function MouseGlowTiltCard({ children, glowColor = '#22D3EE', sx = {}, ...props }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max -6deg tilt
    const rotateY = ((x - centerX) / centerX) * 6;  // max 6deg tilt

    setTilt({ x: rotateX, y: rotateY });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <Box
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        perspective: '1000px',
        height: '100%',
        position: 'relative',
        ...sx
      }}
      {...props}
    >
      <Box
        sx={{
          height: '100%',
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          '@media (prefers-reduced-motion: reduce)': {
            transform: 'none !important',
            transition: 'none !important'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            opacity: isHovered ? 0.35 : 0,
            transition: 'opacity 0.3s ease',
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 70%)`
          }
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
