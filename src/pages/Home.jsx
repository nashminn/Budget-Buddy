import React from 'react'
import { Layout } from '../components/Layout'
import { Box, Grid, Typography } from '@mui/material'

export const Home = () => {
  return (
    <Layout title='Overview'>Home
        <Grid container direction="column">
            {/* Boxes placed side by side at the top */}
            <Grid item container justifyContent="space-between">
                <Grid item xs={12} sm={4}> {/* Adjust size based on screen size */}
                    <Box sx={{ bgcolor: 'primary.main', p: 2 }}>
                        <Typography variant="h6" color="white">Box 1</Typography>
                        {/* Add content for Box 1 */}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box sx={{ bgcolor: 'secondary.main', p: 2 }}>
                        <Typography variant="h6" color="white">Box 2</Typography>
                        {/* Add content for Box 2 */}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box sx={{ bgcolor: 'tertiary.main', p: 2 }}>
                        <Typography variant="h6" color="red">Box 3</Typography>
                        {/* Add content for Box 3 */}
                    </Box>
                </Grid>
            </Grid>

            {/* Vertical content */}
            <Grid item>
                {/* Add your vertical content here */}
            </Grid>
        </Grid>
    </Layout>
  )
}
