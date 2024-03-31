import { Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deleteBudget } from '../../API/services'
import DeleteDialog from '../../components/DeleteDialog'

export const BudgetCard = ({budget, resetCounter, setResetCounter}) => {
  const [filled, setFilled] = useState(0)

  useEffect(() => {

  }, [])

  return (
    <Card variant="outlined" sx={{ width: '100%', marginBottom: 2 , position: 'relative', paddingRight: '40px'}} >
        <CardContent sx={{textAlign: 'left'}}>
            <Typography variant="h5" component="h2">
                {budget.category}
            </Typography>
            <Typography variant="body1">
                {budget.amount}
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
