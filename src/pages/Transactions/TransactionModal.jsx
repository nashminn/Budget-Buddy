import { Box, Button, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { income } from '../../data/categories'
import { getAccountList } from '../../API/services'
import { useNavigate } from 'react-router-dom'

import '../../css/Common.css';
import DatePicker from 'react-datepicker';



export const TransactionModal = ({openModal, setOpenModal, modalType, openSidebar}) => {
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)
    const [account, setAccount] = useState('')
    const [timestamp, setTimestamp] = useState('')
    const [notes, setNotes] = useState('')
    const [accountList, setAccountList] = useState( getAccountList() )
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate()

    useEffect(()=> {
        if(openModal) {
            
        }
    }, [openModal])

    const redirectToAddAnotherAccount = ()=>{
        navigate('/accounts', {
            state: {
                openSidebar: openSidebar,
                showAccForm: true,
            }
        })
    }

    const IncomeModalBody = ()=> {
        const incomeCategoryList = income();

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

                        {accountList.map((item, index) => (
                        <MenuItem key={index} value={item.name}> {item.name + ' (' + item.tag + ')'}  </MenuItem>
                        ))}
                        <MenuItem key="another" value={"Add another"} onClick={redirectToAddAnotherAccount}>Add another account</MenuItem>
                    </TextField>
                
                </div>
            
                <div style={{ marginBottom: '1rem', display: 'flex' }}>
                    <div style={{ flex: 1, marginRight: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1" component="label" htmlFor="Category">Category</Typography>
                            <TextField select type="text" id="category" name="category" 
                                value={category} onChange={(e) => setCategory(e.target.value)} fullWidth > 

                                {incomeCategoryList.map((item, index)=>(
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}

                            </TextField>
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1" component="label" htmlFor="amount">Amount (BDT)</Typography>
                            <TextField type="number" id="amount" name="amount" 
                                        value={amount} onChange={(e) => setAmount(e.target.value)} 
                                        fullWidth/>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' , marginTop: '1rem' }}>
                    <Typography variant="body1" component="label" htmlFor="date-time">Date</Typography>
                    <DatePicker onChange={(date) => setDate(date.toISOString())}
                        dateFormat="dd/MM/yyyy" selected={date} />
                </div>

            
            
                <div style={{ marginBottom: '1rem' }}>
                    <Typography variant="body1" component="label" htmlFor="notes">Notes</Typography>
                    <TextField id="notes" name="notes" multiline rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} fullWidth />
                </div>
            </form>

            <div style={{width: '100%', textAlign: 'right'}}>
                <Button variant='outlined' styles={{marginRight: '0.5rem'}}>Cancel</Button>
                <Button variant='contained' >Save</Button>
            </div>
            
        </Box>)
    }

  return (
    <Modal open={openModal} onClose={()=>setOpenModal(false)}>
        {IncomeModalBody()}
    </Modal>
  )
}
