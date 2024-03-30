import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { expenses, income } from '../../data/categories'

export const FilterTransaction = ({setFilter}) => {
    const [category, setCategory] = useState('')

    const categories = expenses().concat(income())

  return (
    <div style={{marginTop: 40}}>
        <Box>
            
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Filter transactions
            </Typography> 

            <form>
                <div style={{ marginBottom: '1rem' }}>
                    <Typography variant="body1" component="label" htmlFor="category" marginBottom={4}>Category</Typography>
                    <TextField 
                        select 
                        type="text" 
                        id="category" 
                        name="category" 
                        value={category} 
                        onChange={(e) => {
                            setCategory(e.target.value); 
                            setFilter({
                                category: e.target.value
                            }); 
                            console.log(e.target.value) 
                        }} 
                        fullWidth 
                        variant="outlined"
                    > 
                        {categories.map((item, index)=>(
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        ))}
                        
                    </TextField>
                </div>
                <Button onClick={()=>{
                    setFilter({})
                    setCategory('')
                }}>Clear</Button>
            </form>
        </Box>
    </div>
  )
}
