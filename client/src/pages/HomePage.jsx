import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import WalletBalanceCard from '../components/Home/WalletBalanceCard'
import AddBalanceCard from '../components/Home/AddBalanceCard'
import { Grid } from '@mui/material'
import RequestedUser from '../components/Home/RequestedUser'

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