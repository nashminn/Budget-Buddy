import { Card, CardContent, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'

export const AccountCard = ({account}) => {
    const balanceColor = account.balance >= 0 ? 'green' : 'red';
    
  return (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h5" component="h2">
                {account.name}
            </Typography>
            <Typography variant="body1" style={{ color: balanceColor }}>
                Balance: {account.balance}
            </Typography>
            <IconButton aria-label="delete" onClick={()=>{
                alert('delete not implemented yet')
            }}>
                <DeleteIcon />
            </IconButton>
        </CardContent>
    </Card>
  )
}
