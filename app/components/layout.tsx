import React, { ReactNode } from 'react';
import { CssBaseline } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <header>{/* Add your header component here */}</header>
      <main>{children}</main>
      <footer>{/* Add your footer component here */}</footer>
    </>
  );
};

export default Layout;
