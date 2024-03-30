import React from 'react';
import { Dashboard } from './Dashboard';
import { useMediaQuery } from '@mui/material';

export const Layout = ({ title, children, openSidebar }) => {
  const [open, setOpen] = React.useState(openSidebar===undefined?false:true);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <div>
      <Dashboard title={title} open={open} setOpen={setOpen}/>
      <div style={{ marginLeft: isSmallScreen ? 0 : (open ? 240 : 0), marginTop: 64, flexGrow: 1 }}> {/* Adjust margin to accommodate the Drawer */}
        {children}
      </div>
    </div>
  );
};
