import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import WalletBalanceCard from '../components/HomePage/WalletBalanceCard'
import AddBalanceCard from '../components/HomePage/AddBalanceCard'
import { Grid } from '@mui/material'
import RequestedUser from '../components/HomePage/RequestedUser'

function HomePage() {
  return (
    <div>
      <Navbar/>
      <WalletBalanceCard/>
      <Grid container spacing={6}>
       <AddBalanceCard/> 
       <RequestedUser/>
      </Grid>
      
    </div>
  )
}

export default HomePage