import React from 'react'
import LoginForm from '../components/login/LoginForm'
import Navbar from '../components/Navbar/Navbar'
import { Login } from '@mui/icons-material'

function LoginPage() {
  return (
    <div>
      <Navbar/>
      <LoginForm/>
    </div>
  )
}

export default LoginPage