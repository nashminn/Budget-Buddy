import React from 'react'
import { Layout } from '../../components/Layout'
import { Fab } from '@mui/material'
import { Add, Remove,  } from '@mui/icons-material'

export const Transactions = ( {openSidebar} ) => {

  return (
    <Layout title="Transactions" openSidebar={openSidebar}>
      <Fab style={{ position: 'fixed', bottom: 100, right: 20, backgroundColor: '	#90EE90' }}><Add /></Fab>
      <Fab style={{ position: 'fixed', bottom: 30, right: 20, backgroundColor: 'red' }}><Remove /></Fab>
    </Layout>
  )
}
