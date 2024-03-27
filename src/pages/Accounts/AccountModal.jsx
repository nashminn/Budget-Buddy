import { Box, Button, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { v4 as uid } from 'uuid';
import { banks } from '../../data/banks';

export const AccountModal = ( { showForm, setShowForm, addAccount } ) => {
  const [name, setName] = useState('')
  const [initialAmount, setInitAmount] = useState(0)
  const [notes, setNotes] = useState('')
  const [tag, setTag] = useState('')
  const [bankList, setBanks] = useState(banks())

  const clearData = ()=>{
    setName('Account name')
    setInitAmount(0)
    setNotes('')
  }

  const onSave = () => {
    const accountToAdd = {
      id: uid(),
      created: new Date(),
      name: name,
      initialAmount: initialAmount,
      tag: tag, 
      notes: notes,
      balance: initialAmount,
    }

    addAccount(accountToAdd)
    clearData()
    setShowForm(false)
  }

  return (
        <Modal open={showForm} onClose={() => { 
            // console.log("ON HIDE TRIGGERED"); 
            setShowForm(false) 
          }} >

        <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #B2BEB5',
                  boxShadow: 24,
                  p: 4,
                }}>


          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Account
          </Typography>

          <form>
            <div style={{ marginBottom: '1rem' , marginTop: '1rem' }}>
              <Typography variant="body1" component="label" htmlFor="acc_name">Account Name</Typography>
              {/* <TextField id="acc_name" name="acc_name" value={name} onChange={(e) => setName(e.target.value)} fullWidth /> */}

              <TextField
                select
                id='acc_name'
                name="acc_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                fullWidth
                autoComplete="off"
              >
                {/* <datalist id="suggestions"> */}
                  {bankList.map((item, index) => (
                    <MenuItem key={index} value={item}> {item} </MenuItem>
                  ))}
                {/* </datalist> */}
              </TextField>

            </div>

            <div style={{ marginBottom: '1rem' }}>
              <Typography variant="body1" component="label" htmlFor="initAmount">Initial Amount (BDT)</Typography>
              <TextField type="number" id="initAmount" name="initAmount" value={initialAmount} onChange={(e) => setInitAmount(e.target.value)} fullWidth />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <Typography variant="body1" component="label" htmlFor="tag">Tag Name</Typography>
              <TextField type="text" id="tag" name="tag" value={tag} onChange={(e) => setTag(e.target.value)} fullWidth />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <Typography variant="body1" component="label" htmlFor="notes">Notes</Typography>
              <TextField id="notes" name="notes" multiline rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} fullWidth />
            </div>
          </form>

          <Typography color="error">Account information cannot be edited</Typography> 
          <Box sx={{marginTop: 2}}>
            <Button variant="outlined"  onClick={() => { clearData(); setShowForm(false); }}>Close</Button>
            <Button variant="contained" onClick={onSave} style={{ marginLeft: '0.5rem' }}>Save</Button>
          </Box>

        </Box>
        </Modal>
  )
}
