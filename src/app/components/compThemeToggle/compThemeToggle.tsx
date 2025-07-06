'use client'
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useStore } from '@store/useStore';
import type { SearchState } from '@store/useStore';
import './compThemeToggle.scss'

export const CompThemeToggle = () => {
  const mode = useStore((state: SearchState) => state.mode);
  const toggleMode = useStore((state: SearchState) => state.toggleMode);
  return (
    <div className="compThemeToggle">
      <IconButton onClick={toggleMode} color="inherit"
        sx={{
          fontSize: '14px',
          margin: '0 10px 0 0',
          borderRadius: '6px' }}>
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        &nbsp; Theme: {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </IconButton>
    </div>
  );
};