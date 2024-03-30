import { ButtonBase, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getTransactionList } from '../../API/services'

export const HomeTransactionCard = () => {
    const transactionList = getTransactionList().slice(0, 5)
    const navigate = useNavigate()
  return (
    <ButtonBase style={{ width: '100%', display: 'block', textDecoration: 'none', margin: 5 }} 
            onClick={() => {
            navigate("/transactions")
        }}>
        <Card sx={{ borderColor: '#fff', borderWidth: '1px', borderStyle: 'solid' }}>
            <CardHeader title={"Transactions"}/>
            <CardContent>
                {transactionList.map((t, index) => {
                    return (
                        <Grid item textAlign={'left'} margin={2}> 
                            <Divider />
                            <Typography>{t.category}</Typography>
                            <Typography>{"Amount: "+ t.amount + " BDT"}</Typography>
                        </Grid>
                    )
                })}
            </CardContent>
        </Card>
    </ButtonBase>
  )
}
