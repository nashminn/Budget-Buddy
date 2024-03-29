import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { Box, Fab, List, ListItem, Snackbar, Typography } from '@mui/material'
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

  useEffect(()=>{
    if(showSnack) {
      setSnackOpen(true)
      setShowSnack(false)
    }
  }, [showSnack])

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

  const deleteAccount = (accountToDeleteId) => {
    const filteredAcc = accounts.filter((x) => {
      return x.id !== accountToDeleteId
    })
    setAccounts(filteredAcc)
    localStorage.setItem('accounts', JSON.stringify(filteredAcc))
  }


  return (
    <Layout title="Accounts" openSidebar={openSidebar}>
      
      <Box sx={{marginLeft: 20, marginRight: 20}}>

      <Box sx={{marginTop: 10}}>
        <Typography>
          {accounts.length !== 0 ? "Total amount : " + accounts.reduce((acc, curr) => acc + Number(curr.balance), 0) + ' BDT' : '' }
        </Typography>
      </Box>

      {accounts.length !== 0 ? (
          <List>
            {accounts.map((acc, index) => (
              <ListItem key={index}> 
                <AccountCard account={acc} deleteAccount={deleteAccount}/> 
              </ListItem>
            ))}
          </List>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100vh"
          >
            <div>There are no accounts to show</div>
          </Box>
        )}
        
      </Box>

      <AccountModal showForm={showForm} setShowForm={setShowForm} addAccount={addAccount} deleteAccount={deleteAccount}/>

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
