import { Menu } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import React, { useState } from 'react'

export const AppBarComponent = ({openDrawer, toggleDrawer, title}) => {
  
  return (
    <AppBar position='static'>
      <Toolbar>
      <IconButton onClick={()=>{
        console.log("clicked menu icon "+ openDrawer)
        toggleDrawer(!openDrawer)
      }}>
        <Menu />
      </IconButton>
        {title}
      </Toolbar>
    </AppBar>
  )
}
