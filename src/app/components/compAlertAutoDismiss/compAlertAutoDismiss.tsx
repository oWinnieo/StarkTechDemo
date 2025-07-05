'use client'
import React, { useEffect, useState } from 'react';
import { Alert, AlertColor, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import CheckIcon from '@mui/icons-material/Check';
// import Alert from '@mui/material/Alert';
// import CheckIcon Success from '@mui/icons-material/CheckCircle';
import CheckIconCheckCircleOutline from '@mui/icons-material/CheckCircleOutline'; // success
import CheckIconInfoOutline from '@mui/icons-material/InfoOutline';
import CheckIconWarningAmber from '@mui/icons-material/WarningAmber';
import CheckIconErrorOutline from '@mui/icons-material/ErrorOutline';

export const CompAlertAutoDismiss = ({ message, duration = 3000, severity }: { message: string; duration?: number; severity: AlertColor; }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timer); // 清理計時器
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
            top: '50px', // 或 bottom: '1rem'
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999, // 非常大，確保最上層
        }}>
      {message}
    </Alert>
  );
};