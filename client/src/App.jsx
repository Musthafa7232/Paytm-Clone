import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from './pages/HomePage'
import AccountStatementPage from "./pages/AccountStatementPage"
import { Routes,Route } from "react-router-dom"
import UserPublicRoute from "./routes/UserPublicRoute"
import UserPrivateRoute from "./routes/UserPrivateRoute"

function App() {

  return (
    <>
     <Routes>
     <Route element={<UserPublicRoute />}>
     <Route path="/login"  element={<LoginPage/>} />
     <Route path="/Signup"  element={<RegisterPage/>} />
     </Route>
     <Route element={<UserPrivateRoute />}>
     <Route path="/"  element={<HomePage/>} />
     <Route path="/accountStatement"  element={<AccountStatementPage/>} />
     </Route>
     </Routes>
    </>
  )
}

export default App
