import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { Box, Fab, Grid, List, ListItem, Snackbar, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AccountModal } from './AccountModal'
import { AccountCard } from './AccountCard'
import { getAccountList } from '../../API/services'
import { useLocation } from 'react-router-dom'


export const Accounts = ( {openSidebar} ) => {
  const location = useLocation()
  const [accounts, setAccounts] = useState( getAccountList() )
  const [showForm, setShowForm] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [showSnack, setShowSnack] = useState(false)
  const [resetCounter, setResetCounter] = useState(0)

  useEffect(()=>{
    if(showSnack) {
      setSnackOpen(true)
      setShowSnack(false)
    }
  }, [showSnack])

  useEffect(()=>{
    setAccounts(getAccountList())
  }, [resetCounter])

  useEffect(()=>{
    if(location.state !== null) {
      openSidebar = location.state.openSidebar
      setShowForm(location.state.showAccForm)
    }
  }, [])
  

  const addAccount = (accountToAdd) => {
    const newAccounts = [accountToAdd, ...accounts]
    const found = accounts.filter((x) => {
      return x.tag === accountToAdd.tag
    })
    
    if(found.length > 0) {
      return {
        success: false,
        text: "Tag must be unique"
      }
    } else {
      localStorage.setItem('accounts', JSON.stringify(newAccounts))
      setAccounts(newAccounts)

      setShowSnack(true)
      return {
        success: true,
        text: "Account added"
      }
    }
  }



  return (
    <Layout title="Accounts" openSidebar={openSidebar}>
      
      <Box sx={{ marginX: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
        <Box sx={{ marginTop: 10 }}>
          <Typography>
            {accounts.length !== 0 ? 'Total amount : ' + accounts.reduce((acc, curr) => acc + Number(curr.balance), 0) + ' BDT' : ''}
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {accounts.length !== 0 ? (
            accounts.map((acc, index) => (
              <Grid item xs={9} sm={10} md={10} lg={10} key={index}>
                <Box display="flex" justifyContent="center">
                  <AccountCard account={acc} resetCounter={resetCounter} setResetCounter={setResetCounter} />
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <Typography variant="body1">There are no accounts to show</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>


      <AccountModal showForm={showForm} setShowForm={setShowForm} addAccount={addAccount} />

      <Fab style={{ position: 'fixed', bottom: 20, right: 20 }} onClick={()=>setShowForm(true)} > 
        <AddIcon />
      </Fab>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackOpen}
        onClose={()=>{
          setSnackOpen(false)
        }}
        autoHideDuration={3000}
        message="Account added successfully"
        key='key'
      />
    </Layout>
  )
}
