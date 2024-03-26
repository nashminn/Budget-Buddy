import { Card, CardContent, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'
import DeleteDialog from '../../components/DeleteDialog'

export const AccountCard = ({account, deleteAccount}) => {
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
            
            <DeleteDialog deleteHandle={deleteAccount} id={account.id} promptTitle={"Delete account?"} prompt={"Are you sure you want to delete this account?"}/>
        </CardContent>
    </Card>
  )
}
