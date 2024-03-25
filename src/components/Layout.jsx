import React from 'react';
import { Dashboard } from './Dashboard';

export const Layout = ({ title, children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Dashboard title={title} open={open} setOpen={setOpen}/>
      <div style={{ marginLeft: open ? 240 : 0, marginTop: 64, flexGrow: 1 }}> {/* Adjust margin to accommodate the Drawer */}
        {children}
      </div>
    </div>
  );
};
