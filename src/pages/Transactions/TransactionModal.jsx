import { Alert, Box, Button, Menu, MenuItem, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { expenses, income } from '../../data/categories'
import { addNewTransaction, getAccountList } from '../../API/services'
import { useNavigate } from 'react-router-dom'

import '../../css/Common.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { v4 as uid } from 'uuid';


export const TransactionModal = ({openModal, setOpenModal, modalType, 
                                    openSidebar, resetCounter, setResetCounter}) => {
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)
    const [accountTag, setAccountTag] = useState('')
    
    const [notes, setNotes] = useState('')
    const [accountList, setAccountList] = useState( getAccountList() )
    const [date, setDate] = useState(new Date());
    
    const [emptyFieldAlert, setEmptyFieldAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate()


    useEffect(()=> {
        if(openModal) {
            
        }
    }, [openModal]);


    const redirectToAddAnotherAccount = ()=>{
        navigate('/accounts', {
            state: {
                openSidebar: openSidebar,
                showAccForm: true,
            }
        })
    }

    const onCancel = ()=>{
        setOpenModal(false)
        setAccountTag('')
        setCategory('')
        setAmount(0)
        setNotes('')
        setDate(new Date())
    }

    const ModalBody = (title, categoryList)=> {

        // category, wallet, amount, timestamp, type
        const onSave = ()=>{
            if(accountTag.trim().length === 0 || category.trim().length === 0 ) {
                setAlertMessage("Account and category cannot be empty!")
                setEmptyFieldAlert(true)
                return;
            }
            if(amount === 0) {
                setAlertMessage("What's the point in adding a transaction if the amount is zero!")
                setEmptyFieldAlert(true)
                return;
            }
            
            let type
            if(title.includes('Income')) type = 1;
            else type = -1
            const newTransaction = {
                id: uid(),
                created: (new Date()).toISOString(),
                type: type,
                tag: accountTag,
                category: category,
                amount: amount,
                date: date.toISOString(),
                notes: notes
            }
            addNewTransaction(newTransaction);
            setOpenModal(false)
            onCancel()
            setResetCounter(resetCounter + 1)
        }

        return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #B2BEB5',
            boxShadow: 24,
            p: 4,
        }}>
            
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
            </Typography>
            
            <form>
                <div style={{ marginBottom: '1rem' , marginTop: '1rem' }}>
                    <Typography variant="body1" component="label" htmlFor="account">Account</Typography>
                    
                    <TextField
                    select
                    id='account'
                    name="account"
                    value={accountTag}
                    onChange={(e) => { setAccountTag(e.target.value); setEmptyFieldAlert(false)}}
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    >

                        {accountList.map((item, index) => (
                        <MenuItem key={index} value={item.tag}> {item.name + ' (' + item.tag + ')'}  </MenuItem>
                        ))}
                        <MenuItem key="another" value={"Add another"} onClick={redirectToAddAnotherAccount}>Add another account</MenuItem>
                    </TextField>
                
                </div>
            
                <div style={{ marginBottom: '1rem', display: 'flex' }}>
                    <div style={{ flex: 1, marginRight: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1" component="label" htmlFor="Category">Category</Typography>
                            <TextField select type="text" id="category" name="category" 
                                value={category} onChange={(e) => {setCategory(e.target.value); setEmptyFieldAlert(false) }} fullWidth > 

                                {categoryList.map((item, index)=>(
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}

                            </TextField>
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1" component="label" htmlFor="amount">Amount (BDT)</Typography>
                            <TextField type="number" id="amount" name="amount" 
                                        value={amount} onChange={(e) => {setAmount(e.target.value); setEmptyFieldAlert(false) }} 
                                        fullWidth/>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' , marginTop: '1rem' }}>
                    <Typography variant="body1" component="label" htmlFor="date-time">Date</Typography><br/>
                    <DatePicker showIcon onChange={(date) => { setDate(date.toISOString()); setEmptyFieldAlert(false) }}
                        dateFormat="dd/MM/yyyy" selected={date} fullWidth/>
                </div>

            
            
                <div style={{ marginBottom: '1rem' }}>
                    <Typography variant="body1" component="label" htmlFor="notes">Notes</Typography>
                    <TextField id="notes" name="notes" multiline rows={4} value={notes} onChange={(e) => { setNotes(e.target.value); setEmptyFieldAlert(false)}} fullWidth />
                </div>
            </form>

            <div style={{width: '100%', textAlign: 'right'}}>
                <Button variant='outlined' style={{marginRight: '0.5rem'}} onClick={onCancel}>Cancel</Button>
                <Button variant='contained' onClick={onSave}>Save</Button>
            </div>
            {emptyFieldAlert && (
                <Alert severity='warning' style={{marginTop: 5}}>{alertMessage}</Alert>
            )}
        </Box>)
    }


  return (
    <Modal open={openModal} onClose={()=>{ setOpenModal(false); onCancel(); }}>
        {modalType===1?(ModalBody("Add Income", income())):ModalBody("Add Expense", expenses())}
        
    </Modal>
  )
}
