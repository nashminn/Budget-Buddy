import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { Box, Fab, Grid, useMediaQuery, useTheme } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { TransactionModal } from './TransactionModal'
import { TransactionCard } from './TransactionCard'
import { getTransactionList } from '../../API/services'

export const Transactions = ({ openSidebar }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState(1)
  const [resetCounter, setResetCounter] = useState(0)
  const [transactionList, setTransactionList] = useState(getTransactionList())

  useEffect(() => {
    setTransactionList(getTransactionList())
  }, [resetCounter])

  return (
    <Layout title="Transactions" openSidebar={openSidebar}>
      <Grid container spacing={4}>
        {isLargeScreen ? (
          <>
            <Grid item xs={12} md={4}>
              <Box padding={3} margin={3}>
              "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
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
              "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
            </Grid>
            <Grid item xs={12}>
              {transactionList.map((t, index) => (
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
