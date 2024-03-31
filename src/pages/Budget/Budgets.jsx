import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { BudgetModal } from './BudgetModal'
import { Box, Fab, Grid, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { getBudget } from '../../API/services'
import { BudgetCard } from './BudgetCard'

export const Budgets = ( {openSidebar} ) => {
  const [openModal, setOpenModal] = useState(false)
  const [resetCounter, setResetCounter] = useState(0)
  const [budgetList, setBudgetList] = useState([])

  useEffect(() => {
    setBudgetList(getBudget())
  }, [resetCounter])


  return (
    <Layout title="Budgets" openSidebar={openSidebar}>
      <Grid container spacing={4} justifyContent="center" marginTop={10}>
          {budgetList.length !== 0 ? (
            budgetList.map((b, index) => (
              <Grid item xs={9} sm={10} md={10} lg={10} key={index}>
                <Box display="flex" justifyContent="center">
                  <BudgetCard budget={b} resetCounter={resetCounter} setResetCounter={setResetCounter} />
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <Typography variant="body1">No budgets to show</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      <BudgetModal openModal={openModal} setOpenModal={setOpenModal} resetCounter={resetCounter} setResetCounter={setResetCounter}/>
      <Fab style={{ position: 'fixed', bottom: 30, right: 20, backgroundColor: '#ADD8E6' }} onClick={() => {
        setOpenModal(true)
      }}><Add /></Fab>
    </Layout>
  )
}
