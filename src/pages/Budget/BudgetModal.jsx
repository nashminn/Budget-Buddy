import { Alert, Box, Button, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { expenses } from '../../data/categories'
import { v4 as uid } from 'uuid';
import { addBudget } from '../../API/services';

export const BudgetModal = ({openModal, setOpenModal, resetCounter, setResetCounter}) => {
    const categoryList = expenses()
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)
    const [duration, setDuration] = useState('')
    const [emptyFieldAlert, setEmptyFieldAlert] = useState(false)

    useEffect(()=>{

    }, [resetCounter])


    const onCancel = () => {
        console.log("in on cancel")
        setOpenModal(false)
        setCategory('')
        setAmount(0)
        setEmptyFieldAlert(false)
    }

    const onSave = () => {
        console.log("saving budget")
        if(category.trim().length === 0 || Number(amount) === 0) {
            setEmptyFieldAlert(true)
            return 
        }
        const budgetToAdd = {
            id: uid(),
            created: new Date(),
            category: category,
            amount: amount,
        }
        addBudget(budgetToAdd)
        setOpenModal(false)
        onCancel()
        setResetCounter(resetCounter + 1)
    }

  return (
    <Modal open={openModal}>
        <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                width: '90%', 
                maxWidth: 600, 
                bgcolor: 'background.paper',
                border: '2px solid #B2BEB5',
                boxShadow: 24,
                p: 4,
            }}>
                
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Monthly Budget
                </Typography>
                
                <form>
                
                    <div style={{ marginBottom: '1rem' }}>
                        <Typography variant="body1" component="label" htmlFor="category">Category</Typography>
                        <TextField 
                            select 
                            type="text" 
                            id="category" 
                            name="category" 
                            value={category} 
                            onChange={(e) => {setCategory(e.target.value); setEmptyFieldAlert(false) }} 
                            fullWidth 
                            variant="outlined"
                        > 
                            {categoryList.map((item, index)=>(
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </div>

                    {/* <div style={{ marginBottom: '1rem' }}>
                        <Typography variant="body1" component="label" htmlFor="category">Duration</Typography>
                        <TextField 
                            select 
                            type="text" 
                            id="category" 
                            name="category" 
                            value={duration} 
                            onChange={(e) => {setDuration(e.target.value); setEmptyFieldAlert(false) }} 
                            fullWidth 
                            variant="outlined"
                        > 
                            {['Weekly', 'Monthly'].map((item, index)=>(
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </div> */}

                    <div style={{ marginBottom: '1rem' }}>
                        <Typography variant="body1" component="label" htmlFor="amount">Amount (BDT)</Typography>
                        <TextField 
                            type="number" 
                            id="amount" 
                            name="amount" 
                            value={amount} 
                            onChange={(e) => {setAmount(e.target.value); setEmptyFieldAlert(false) }} 
                            fullWidth 
                            variant="outlined"
                        />
                    </div>

                </form>
            
                <div style={{width: '100%', textAlign: 'right'}}>
                    <Button variant='outlined' style={{marginRight: '0.5rem'}} onClick={onCancel}>Cancel</Button>
                    <Button variant='contained' onClick={onSave}>Save</Button>
                </div>
                {emptyFieldAlert && (
                    <Alert severity='warning' style={{marginTop: 5}}>All fields must be filled</Alert>
                )}
            </Box>
    </Modal>
  )
}
