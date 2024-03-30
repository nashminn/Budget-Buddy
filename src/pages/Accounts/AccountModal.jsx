import { Alert, Box, Button, Menu, MenuItem, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { v4 as uid } from 'uuid';
import { banks } from '../../data/banks';

export const AccountModal = ( { showForm, setShowForm, addAccount } ) => {
  const [name, setName] = useState('')
  const [initialAmount, setInitAmount] = useState(0)
  const [notes, setNotes] = useState('')
  const [tag, setTag] = useState('')
  const [bankList, setBanks] = useState(banks())
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState(false)

  const clearData = ()=>{
    setName('Account name')
    setInitAmount(0)
    setNotes('')
    setTag('')
  }

  const onSave = (e) => {
    if (tag.trim() === '' || name.trim() === '') {
      setAlertMessage("Account name and tag cannot be empty!")
      setEmptyFieldAlert(true)
      return; // Exit the function without submitting the form
    }

    const accountToAdd = {
      id: uid(),
      created: new Date(),
      name: name,
      initialAmount: initialAmount,
      tag: tag, 
      notes: notes,
      balance: initialAmount,
    }

    const message = addAccount(accountToAdd)
    if(message.success) {
      clearData()
      setShowForm(false)
    } else {
      setAlertMessage("Tag must be unique!")
      setEmptyFieldAlert(true)
    }
    
  }

  return (
    
        <Modal open={showForm} onClose={() => { 
            setShowForm(false) 
          }} >

        <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%', // Adjust width based on screen size
              maxWidth: 'sm', // Responsive maximum width
              bgcolor: 'background.paper',
              border: '2px solid #B2BEB5',
              boxShadow: 24,
              p: { xs: 2, sm: 4 }, // Adjust padding based on screen size
            }}>


          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Account
          </Typography>

          <form>
            <div style={{ marginBottom: '1rem' , marginTop: '1rem' }}>
              <Typography variant="body1" component="label" htmlFor="acc_name">Account Name</Typography>
              
              <TextField required
                select
                id='acc_name'
                name="acc_name"
                value={name}
                onChange={(e) => {
                  setEmptyFieldAlert(false)
                  setName(e.target.value)
                }}
                variant="outlined"
                fullWidth
                autoComplete="off"
              >
                  {bankList.map((item, index) => (
                    <MenuItem key={index} value={item}> {item} </MenuItem>
                  ))}
              </TextField>

            </div>

            <div style={{ marginBottom: '1rem' }}>
              <Typography variant="body1" component="label" htmlFor="initAmount">Initial Amount (BDT)</Typography>
              <TextField type="number" id="initAmount" name="initAmount" 
                          value={initialAmount} onChange={(e) => {setEmptyFieldAlert(false); setInitAmount(e.target.value)} } 
                          fullWidth/>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <Typography variant="body1" component="label" htmlFor="tag">Tag Name</Typography>
              <TextField required type="text" id="tag" name="tag" value={tag} 
                          onChange={(e) => { setTag(e.target.value.replace(' ', '-')); setEmptyFieldAlert(false); } } fullWidth 
                          placeholder="Handy keyword for search" />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <Typography variant="body1" component="label" htmlFor="notes">Notes</Typography>
              <TextField id="notes" name="notes" multiline rows={5} value={notes} onChange={(e) => { setEmptyFieldAlert(false); setNotes(e.target.value) }} fullWidth />
            </div>
          </form>

          <Typography color="error">Account information cannot be edited</Typography> 
          <Box sx={{marginTop: 2}}>
            <Button variant="outlined"  onClick={() => { clearData(); setShowForm(false); }}>Close</Button>
            <Button variant="contained" onClick={onSave} style={{ marginLeft: '0.5rem' }}>Save</Button>
          </Box>

          {emptyFieldAlert && (
            <Stack>
              <Alert severity='warning'>{alertMessage}</Alert>
            </Stack>
          )}

        </Box>
        
        </Modal>
  )
}
