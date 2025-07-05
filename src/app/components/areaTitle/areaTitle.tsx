'use client'
import React from "react";
import { useTheme } from '@mui/material';
import './areaTitle.scss'
type AreaTitleProps = {
  title: string;
};

export const AreaTitle: React.FC<AreaTitleProps> = ({ title }) => {
    const theme = useTheme();
    return (
        <div className="areaTitle"
            style={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}>
            <span className="title">{title}</span>
        </div>
    )
}