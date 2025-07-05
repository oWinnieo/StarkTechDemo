'use client'
import React from 'react'
import { CompSearchBar } from '@/app/components/compSearchBar/compSearchBar'
import { CompThemeToggle } from '@/app/components/compThemeToggle/compThemeToggle'

import './navBar.scss'

type NavBarProps = {
  token: string | undefined;
};

export const NavBar: React.FC<NavBarProps> = ({ token }) => {
    return (<div className="compNavBar">
        <div className="navBar-in">
            <CompThemeToggle />
            <CompSearchBar
                token={token} />
        </div>
    </div>)
    
}