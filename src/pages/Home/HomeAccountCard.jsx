import { ButtonBase, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccountList } from '../../API/services'

export const HomeAccountCard = () => {
    const navigate = useNavigate()
    const accountsList = getAccountList()
  return (
    <ButtonBase style={{ width: '100%', display: 'block', textDecoration: 'none' , margin: 2}} 
            onClick={() => {
                navigate("/accounts")
            }}>
        <Card sx={{ borderColor: '#fff', borderWidth: '1px', borderStyle: 'solid' }} >
            <CardHeader title={"Accounts"}/>
            <CardContent>
                {accountsList.map((acc, index) => {
                    return (
                        <Grid item textAlign={'left'} margin={2}> 
                            <Divider />
                            <Typography>{acc.name}</Typography>
                            <Typography>{"Balance: "+ acc.balance + " BDT"}</Typography>
                        </Grid>
                    )
                })}
            </CardContent>
        </Card>
    </ButtonBase>
  )
}
