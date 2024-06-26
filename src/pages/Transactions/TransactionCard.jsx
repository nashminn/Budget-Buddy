import { Box, Card, CardContent, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteDialog from '../../components/DeleteDialog';
import { deleteTransaction } from '../../API/services';
import { formatDate } from '../../API/utility';

// category, wallet, amount, timestamp, type

export const TransactionCard = ({transaction, resetCounter, setResetCounter}) => {
    const [category, setCategory] = useState(transaction===undefined?"":transaction.category) 
    const [wallet, setWallet] = useState(transaction===undefined?"":transaction.tag)
    const [amount, setAmount] = useState(transaction===undefined?'':transaction.amount)
    const [date, setDate] = useState(transaction===undefined?'':transaction.date)
    const [color, setColor] = useState(transaction===undefined?'#FF5C5C':transaction.type===1?"#90EE90":"#FF5C5C")
    
    const isToday = (_date)=>{
        const today = new Date()
        const date = new Date(_date)
        return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
    }
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <Card sx={{border: 1, margin: 2, borderColor: color}}>
        <CardContent >
            <Grid container justifyContent="space-between">
                <Grid item>
                    <Typography>
                        {category}
                    </Typography>

                    <Typography>
                        {wallet}
                    </Typography>
                </Grid>
        
                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item style={{textAlign: 'right'}}>
                        <Typography >
                           BDT {amount}
                        </Typography>

                        <Typography>
                            {isToday(date)?"Today": formatDate(new Date(date))}
                        </Typography>
                    </Grid>

                    <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        {/* <MenuItem onClick={handleClose}>View details</MenuItem> */}
                        <MenuItem >
                    <DeleteDialog deleteHandle={deleteTransaction} id={transaction.id} resetCounter={resetCounter}
                        setResetCounter={setResetCounter} handleClose={handleClose}
                        promptTitle={"Delete transaction?"} 
                        prompt={"The account will be restored without this transaction. Are you sure you want to delete this transaction?"}>Delete transaction</DeleteDialog></MenuItem>
                        
                    </Menu>
                    
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  )
}
