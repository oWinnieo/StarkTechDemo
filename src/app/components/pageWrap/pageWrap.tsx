'use client'
import React, { ReactNode } from 'react';
import { useTheme } from '@mui/material';
import './pageWrap.scss'

type PageWrapProps = {
  children: ReactNode;
};

export const PageWrap: React.FC<PageWrapProps> = ({ children }) => {
    const theme = useTheme();
    return (
        <div className="pageWrap"
            style={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}>
            <div className="pageWrap-in">
                {children}
            </div>
        </div>
    )
}