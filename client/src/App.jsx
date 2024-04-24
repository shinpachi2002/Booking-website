import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import IndexPage from './pages/IndexxPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Header from './Header.jsx'
import Layout from './Layout.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import axios from 'axios'
import { UserContextProvider } from './UserContext.jsx'
import AccountPage from './pages/Profile.jsx'
import PlacesPage from './pages/PlacesPage.jsx'
import ProfilePage from './pages/Profile.jsx'
import PLacesFormPage from './pages/PLacesFormPage.jsx'
import SinglePage from './pages/SinglePage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import BookingsPage from './pages/BookingsPage.jsx'

axios.defaults.baseURL="http://localhost:4000";
axios.defaults.withCredentials=true;
function App() {
  return (
    <UserContextProvider>
       <Routes>
        <Route path="/" element={<Layout></Layout>}>
         <Route index element={<IndexPage></IndexPage>}></Route>
         <Route path="/login" element={<LoginPage></LoginPage>}></Route>
         <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
         <Route path='/account' element={<ProfilePage></ProfilePage>}></Route>
         <Route path="/account/places" element={<PlacesPage></PlacesPage>}></Route>
         <Route path="/account/places/new" element={<PLacesFormPage></PLacesFormPage>}></Route>
         <Route path="/account/places/:id" element={<PLacesFormPage></PLacesFormPage>}></Route>
         <Route path="/account/bookings" element={<BookingsPage></BookingsPage>}></Route>
         <Route path="/account/bookings/:id" element={<BookingPage></BookingPage>}></Route>
         <Route path="/places/:id" element={<SinglePage></SinglePage>}></Route>
        </Route>
       </Routes>
   </UserContextProvider>
  )
}

export default App
