'use client'
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useStore } from '@store/useStore';
import type { SearchState } from '@store/useStore';

export const CompThemeToggle = () => {
  const mode = useStore((state: SearchState) => state.mode);
  const toggleMode = useStore((state: SearchState) => state.toggleMode);

  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};