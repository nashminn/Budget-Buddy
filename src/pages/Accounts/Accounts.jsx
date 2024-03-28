import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { Box, Fab, List, ListItem, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AccountModal } from './AccountModal'
import { AccountCard } from './AccountCard'
import { getAccountList } from '../../API/services'
import { useLocation } from 'react-router-dom'


export const Accounts = ( {openSidebar} ) => {
  const location = useLocation()
  const [accounts, setAccounts] = useState( getAccountList() )
  const [showForm, setShowForm] = useState(false)

  useEffect(()=>{
    if(location.state !== null) {
      openSidebar = location.state.openSidebar
      setShowForm(location.state.showAccForm)
    }
  }, [])
  

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
    </Layout>
  )
}
