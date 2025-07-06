'use client'
import React, { useEffect, useState } from 'react';
import { Alert, AlertColor, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIconCheckCircleOutline from '@mui/icons-material/CheckCircleOutline'; // success
import CheckIconInfoOutline from '@mui/icons-material/InfoOutline'; // info
import CheckIconWarningAmber from '@mui/icons-material/WarningAmber'; // warning
import CheckIconErrorOutline from '@mui/icons-material/ErrorOutline'; // error

export const CompAlertAutoDismiss = ({ message, duration = 3000, severity }: { message: string; duration?: number; severity: AlertColor; }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!open) return null;
  
  const Icon = () => {
    switch (severity) {
        case 'success':
            return <CheckIconCheckCircleOutline fontSize="inherit" />
        case 'info':
            return <CheckIconInfoOutline fontSize="inherit" />
        case 'warning':
            return <CheckIconWarningAmber fontSize="inherit" />
        case 'error':
            return <CheckIconErrorOutline fontSize="inherit" />
    }
  }

  return (
    <Alert icon={<Icon />} severity={severity}
        action={
            <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setOpen(false)}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
        }
        sx={{
            position: 'fixed',
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
        }}>
      {message}
    </Alert>
  );
};