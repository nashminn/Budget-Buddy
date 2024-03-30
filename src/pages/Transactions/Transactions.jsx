import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { Box, Fab, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Add, ChevronLeft, ChevronRight, Remove } from '@mui/icons-material'
import { TransactionModal } from './TransactionModal'
import { TransactionCard } from './TransactionCard'
import { getTransactionList, getTransactionListByMonth } from '../../API/services'
import { FilterTransaction } from './FilterTransaction'
import { nextMonth, previousMonth } from '../../API/utility'

export const Transactions = ({ openSidebar }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [filter, setFilter] = useState({})

  const [date, setDate] = useState(new Date())
  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState(1)
  const [resetCounter, setResetCounter] = useState(0)
  const [transactionList, setTransactionList] = useState(getTransactionList())

  useEffect(() => {
    setTransactionList(getTransactionList())
  }, [resetCounter])

  useEffect(() => {
    setTransactionList(getTransactionListByMonth(date))
  }, [date])

  useEffect(()=>{
    if(Object.keys(filter).length > 0) {
      console.log(filter)
      const all = getTransactionListByMonth(date)
      const filtered = all.filter((x)=>{
        return x.category.includes(filter.category)
      })
      setTransactionList(filtered)
    } else {
      setTransactionList(getTransactionListByMonth(date))
    }
  }, [filter])

  const monthTop = ()=> {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 8px' }}>
  <IconButton 
    sx={{ width: '40px', height: '40px' }} 
    onClick={() => { setDate(previousMonth(date)); }}
  >
    <ChevronLeft />
  </IconButton>
  <span style={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
    {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
  </span>
  <IconButton 
    sx={{ width: '40px', height: '40px' }} 
    onClick={() => { setDate(nextMonth(date)); }}
  >
    <ChevronRight />
  </IconButton>
</div>


    )
  }

  return (
    <Layout title="Transactions" openSidebar={openSidebar}>
      <Grid container spacing={4}>
        {isLargeScreen ? (
          <>
            <Grid item xs={12} md={4}>
              <Box padding={3} margin={3}>
                <>
                  <FilterTransaction setFilter={setFilter}/>
                </>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box width="100%">
                {monthTop()}
              </Box>
              <Box padding={3}>
                {transactionList.map((t, index) => (
                  <TransactionCard transaction={t} key={t.id} resetCounter={resetCounter} setResetCounter={setResetCounter} />
                ))}
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <FilterTransaction setFilter={setFilter} />  
            </Grid>
            <Grid item xs={12}>
            {monthTop()}
            </Grid>
            
            <Grid item xs={12}>
              {transactionList.length === 0?<Typography>No transactions for this month</Typography>:
              transactionList.map((t, index) => (
                <TransactionCard transaction={t} key={t.id} resetCounter={resetCounter} setResetCounter={setResetCounter} />
              ))}
            </Grid>
          </>
        )}
      </Grid>

      <TransactionModal openModal={openModal} setOpenModal={setOpenModal} modalType={modalType} openSidebar={openSidebar} resetCounter={resetCounter} setResetCounter={setResetCounter} />

      <Fab style={{ position: 'fixed', bottom: 100, right: 20, backgroundColor: '	#90EE90' }}
        onClick={() => { setOpenModal(true); setModalType(1) }} ><Add /></Fab>
      <Fab style={{ position: 'fixed', bottom: 30, right: 20, backgroundColor: '#FF5C5C' }}
        onClick={() => { setOpenModal(true); setModalType(-1) }}><Remove /></Fab>
    </Layout>
  )
}
