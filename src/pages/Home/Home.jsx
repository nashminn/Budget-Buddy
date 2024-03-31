import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { Box, ButtonBase, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { getAccountList, getTransactionListByMonth } from '../../API/services'
import { HomeAccountCard } from './HomeAccountCard'
import { HomeTransactionCard } from './HomeTransactionCard'
import { useNavigate } from 'react-router-dom'
import { PieChartComponent } from './PieChartComponent'
import { previousMonth } from '../../API/utility'

export const Home = () => {
    const navigate = useNavigate()
    const [accounts, setAccounts] = useState([])
    const [currentBalance, setCurrentBalance] = useState(0)

    const getTotalBalance = ()=> {
        const balance = accounts.reduce((acc, curr)=>{
            acc = Number(acc) + Number(curr.balance)
            return acc
        }, 0)
        return balance
    }

    useEffect(() => {
        setAccounts( getAccountList() )
        
    }, [])

  return (
    <Layout title='Overview'>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={2} sx={{  flex: 1 }}>
                <Grid item container justifyContent="space-between" marginBottom={5}>
                <Grid item xs={12} sm={4}>
                    <Box sx={{  p: 2 }} >
                        <ButtonBase onClick={()=>navigate('/accounts')} style={{ width: '100%', display: 'block', textDecoration: 'none' }} >
                            <Card> 
                                <CardHeader title={"Summary"}/>
                                <CardContent>
                                    <Typography>
                                        Balance: {getTotalBalance() + " BDT"}
                                    </Typography>
                                </CardContent>
                            </Card>
                    </ButtonBase>
                    </Box>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                    <Box sx={{ p: 2 }}>
                        <ButtonBase onClick={()=>navigate('/transactions')}>
                            <Card>
                                <CardHeader title={"This month's transaction"}/>
                                <CardContent>
                                    
                                    <Typography>Income: {getTransactionListByMonth(new Date()).reduce((acc, curr) => {
                                        if(curr.type === 1){
                                            acc = Number(acc) + Number(curr.amount)
                                        }
                                        return acc
                                    }, 0)}</Typography>
                                    <Typography>Expenses: {getTransactionListByMonth(( new Date() )).reduce((acc, curr) => {
                                        if(curr.type === -1){
                                            acc = Number(acc) + Number(curr.amount)
                                        }
                                        return acc
                                    }, 0)}</Typography>
                                </CardContent>
                            </Card>
                        </ButtonBase>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                <Box sx={{ p: 2 }}>
                        <ButtonBase onClick={()=>navigate('/transactions', {
                            state: {
                                prevMonth: true
                            }
                        })}>
                            <Card>
                                <CardHeader title={"Last month's transaction"}/>
                                <CardContent>
                                    <Typography>Income: {getTransactionListByMonth(previousMonth( new Date() )).reduce((acc, curr) => {
                                        if(curr.type === 1){
                                            acc = Number(acc) + Number(curr.amount)
                                        }
                                        return acc
                                    }, 0)}</Typography>
                                    <Typography>Expenses: {getTransactionListByMonth(previousMonth( new Date() )).reduce((acc, curr) => {
                                        if(curr.type === -1){
                                            acc = Number(acc) + Number(curr.amount)
                                        }
                                        return acc
                                    }, 0)}</Typography>
                                </CardContent>
                            </Card>
                        </ButtonBase>
                    </Box>
                </Grid>
                </Grid>

                {/* Vertical content */}
                <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                    <HomeAccountCard />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                    <HomeTransactionCard />
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
        </Box>
    </Layout>
  )
}
