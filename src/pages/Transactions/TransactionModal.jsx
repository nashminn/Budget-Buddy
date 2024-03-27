import { Box, MenuItem, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'



export const TransactionModal = ({openModal, setOpenModal, modalType}) => {
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)
    const [account, setAccount] = useState('')
    const [timestamp, setTimestamp] = useState('')
    const [notes, setNotes] = useState('')
    const [accountList, setAccountList] = useState([])

    useEffect(()=> {
        if(openModal) {
            
        }
    }, openModal)


    const IncomeModalBody = ()=> {
        return (
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
            Add Income
            </Typography>
            
            <form>
            <div style={{ marginBottom: '1rem' , marginTop: '1rem' }}>
                <Typography variant="body1" component="label" htmlFor="account">Account</Typography>
                
                <TextField
                select
                id='account'
                name="account"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                variant="outlined"
                fullWidth
                autoComplete="off"
                >
                {/* <datalist id="suggestions"> */}
                    {accountList.map((item, index) => (
                    <MenuItem key={index} value={item}> {item} </MenuItem>
                    ))}
                {/* </datalist> */}
                </TextField>
            
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
                <Typography variant="body1" component="label" htmlFor="Category">Category</Typography>
                <TextField type="text" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} fullWidth />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
                <Typography variant="body1" component="label" htmlFor="notes">notes Name</Typography>
                <TextField type="text" id="notes" name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} fullWidth />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
                <Typography variant="body1" component="label" htmlFor="notes">Notes</Typography>
                <TextField id="notes" name="notes" multiline rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} fullWidth />
            </div>
            </form>
            
            
            {/* {modalType===1?} */}
            
        </Box>)
    }

  return (
    <Modal open={openModal} onClose={()=>setOpenModal(false)}>
        {IncomeModalBody}
    </Modal>
  )
}
