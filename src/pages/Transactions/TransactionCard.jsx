import { Box, Card, CardContent, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

// category, wallet, amount, timestamp, type

export const TransactionCard = ({transaction}) => {
    const [category, setCategory] = useState(transaction===undefined?"":transaction.category) 
    const [wallet, setWallet] = useState(transaction===undefined?"":transaction.wallet)
    const [amount, setAmount] = useState(transaction===undefined?'':transaction.amount)
    const [timestamp, setTimestamp] = useState(transaction===undefined?'':transaction.timestamp.toISOString())
    const [color, setColor] = useState(transaction===undefined?'#FF5C5C':transaction.type===1?"#90EE90":"#FF5C5C")
    
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
                            {amount}
                        </Typography>

                        <Typography>
                            {timestamp}
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
                        <MenuItem onClick={handleClose}>View details</MenuItem>
                        <MenuItem onClick={handleClose}>Duplicate transaction</MenuItem>
                        <MenuItem onClick={handleClose}>Edit transaction</MenuItem>
                        <MenuItem onClick={handleClose}>Delete transaction</MenuItem>
                        
                    </Menu>

                </Grid>
            </Grid>
        </CardContent>
    </Card>
  )
}
