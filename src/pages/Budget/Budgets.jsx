import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { BudgetModal } from './BudgetModal'
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'

export const Budgets = ( {openSidebar} ) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Layout title="Budgets" openSidebar={openSidebar}>
      Budgets
      <BudgetModal openModal={openModal} setOpenModal={setOpenModal}/>
      <Fab style={{ position: 'fixed', bottom: 30, right: 20, backgroundColor: '#ADD8E6' }} onClick={() => {
        setOpenModal(true)
      }}><Add /></Fab>
    </Layout>
  )
}
