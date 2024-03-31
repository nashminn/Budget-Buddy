import { Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deleteBudget, getTransactionList, getTransactionListByMonth } from '../../API/services'
import DeleteDialog from '../../components/DeleteDialog'

export const BudgetCard = ({budget, resetCounter, setResetCounter}) => {
  const [filled, setFilled] = useState(0)
  const [spent, setSpent] = useState(0)
  const [remAmount, setRemAmount] = useState(0)

  const isSameMonth = (d1, d2)=>{
    return (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth())
  }

  useEffect(() => {
    const all = getTransactionListByMonth(new Date(budget.created))
    const filtered = all.filter((x) => {
        if(Number(x.type) === 1 ) return false
        if(!isSameMonth(new Date(), new Date(x.created))) return false
        if(!x.category.includes(budget.category)) return false
        return true
    })
    const spent = filtered.reduce((acc, curr) => {
        acc = Number(acc)+ Number(curr.amount)
        return acc
    }, 0)
    setSpent(spent)
    setRemAmount(Number(budget.amount) - Number(spent))
  }, [])

  return (
    <Card variant="outlined" sx={{ width: '100%', marginBottom: 2 , position: 'relative', paddingRight: '40px'}} >
        <CardContent sx={{textAlign: 'left'}}>
            <Typography variant="h5" component="h2">
                {budget.category}
            </Typography>
            <Typography variant="body1">
                Amount: {budget.amount}
            </Typography>

            <Typography variant="body1">
                Spent: {spent} 
            </Typography>

            <Typography variant="body1">
                Remaining: {remAmount}
            </Typography>
            

            <div style={{ position: 'absolute', top: 5, right: 5 }}>  
                <DeleteDialog showIcon={true} deleteHandle={deleteBudget} id={budget.id} 
                promptTitle={"Delete budget?"} prompt={"Are you sure you want to delete this budget?"}
                resetCounter={resetCounter} setResetCounter={setResetCounter} />
            </div>
        </CardContent>
    </Card>
  )
}
