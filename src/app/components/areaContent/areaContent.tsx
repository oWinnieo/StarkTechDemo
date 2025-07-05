'use client'
import React, { ReactNode } from 'react';
import { useTheme } from '@mui/material';
import './areaContent.scss'

type AreaContentProps = {
  children: ReactNode;
};
export const AreaContent: React.FC<AreaContentProps> = ({ children }) => {
    const theme = useTheme();
    return (
        <div className="areaContent"
            style={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}>
            {children}
        </div>
    )
}