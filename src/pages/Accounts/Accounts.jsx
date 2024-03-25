import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'


export const Accounts = ( {openSidebar} ) => {
  const [accounts, setAccounts]= useState( localStorage.getItem('accounts') )

  return (
    <Layout title="Accounts" openSidebar={openSidebar}>
      <Box>
        
      </Box>

      <Fab style={{ position: 'fixed', bottom: 20, right: 20 }}> 
        <AddIcon />
      </Fab>
    </Layout>
  )
}
