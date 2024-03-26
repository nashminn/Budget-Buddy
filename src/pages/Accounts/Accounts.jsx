import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Box, Fab, List, ListItem, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AccountModal } from './AccountModal'
import { AccountCard } from './AccountCard'


export const Accounts = ( {openSidebar} ) => {
  const [accounts, setAccounts] = useState( localStorage.getItem('accounts')===null?[]: JSON.parse( localStorage.getItem('accounts') ))
  const [showForm, setShowForm] = useState(false)


  const addAccount = (accountToAdd) => {
    const newAccounts = [accountToAdd, ...accounts]
    localStorage.setItem('accounts', JSON.stringify(newAccounts))
    setAccounts(newAccounts)
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
      
      <Box>

      <Box sx={{marginTop: 5}}>
        <Typography>
          {accounts.length !== 0 ? "Total amount " + accounts.reduce((acc, curr) => acc + curr.balance, 0) : 0}
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
    </Layout>
  )
}
