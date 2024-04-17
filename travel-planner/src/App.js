import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material';

// screens and components
import Exploration from './screens/Exploration'
import CreateExperience from './screens/CreateExperience'
import Profile from './screens/Profile.js';
import Account from './screens/Account.js';
import UserExperiences from './screens/UserExperiences.js';
import Favorites from './screens/Favorites.js';
import Reviews from './screens/Reviews.js';
import Trips from './screens/Trips.js';
import Trip from './components/Trip.js';
import CreateTrip from './screens/CreateTrip';
import UpdateTrip from './screens/UpdateTrip';
import Buttons from './components/Buttons.js';
import Register from './screens/Register.js';
import Login from './screens/Login.js';
import Theme from './UX/Theme'
import { ThemeProvider } from '@mui/material/styles'
import Search from './screens/Search';
import UpdateExperience from './screens/UpdateExperience.js';
import Experience from './screens/Experience.js';

function App() {
  const [expId, setExpId] = useState()
  const [initialExp, setInitialExp] = useState()
  const [experienceToUpdate, setExperienceToUpdate] = useState([])
  const [favoriteToUpdate, setUserFavorites] = useState([])
  const [tripObject, setTripObject] = useState()

  return (
    <main>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <Buttons />
          <Container>
            <Routes>
              <Route path="/" element={<Exploration setExpId={setExpId} />} />
              <Route path="create-exp" element={<CreateExperience />} />
              <Route path="profile" element={<Profile />} />
              <Route path="account" element={<Account />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="UserExperiences" element={<UserExperiences setExperienceToUpdate={setExperienceToUpdate} />} />
              <Route path="update-exp" element={<UpdateExperience experienceToUpdate={experienceToUpdate} />} />
              <Route path="favorites" element={<Favorites favoriteToUpdate={favoriteToUpdate} setUserFavorites={setUserFavorites} setExpId={setExpId} />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="trips" element={<Trips setTripObject={setTripObject} />} />
              <Route path="trips/trip" element={<Trip tripObject={tripObject} setExpId={setExpId} />} />
              <Route path="trips/create-trip" element={<CreateTrip initialExp={initialExp} />} />
              <Route path="trips/trip/update-trip" element={<UpdateTrip tripObject={tripObject} />} />
              <Route path="search" element={<Search setExpId={setExpId} />} />
              <Route path="experience" element={<Experience expId={expId} setExperienceToUpdate={setExperienceToUpdate} setInitialExp={setInitialExp} />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </main>
  )
}

export default App;