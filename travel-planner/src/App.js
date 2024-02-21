import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Container} from '@mui/material';

// screens and components
import Exploration from './screens/Exploration'
import CreateExperience from './screens/CreateExperience'
import Profile from './screens/Profile.js';
import Account from './screens/Account.js';
import UserExperiences from './screens/UserExperiences.js';
import Favorites from './screens/Favorites.js';
import Ratings from './screens/Ratings.js';
import Trips from './screens/Trips.js';
import { UpdateExperience } from './screens/UpdateExperience.js';
import Trip from './components/Trip.js';
import CreateTrip from './screens/CreateTrip';
import UpdateTrip from './screens/UpdateTrip';
import Buttons from './components/Buttons.js';
import Register from './screens/Register.js';
import Login from './screens/Login.js';
import Theme from './UX/Theme'
import { ThemeProvider } from '@mui/material/styles'

function App() {
  const [experienceObject, setExperienceObject] = useState()
  const [tripObject, setTripObject] = useState()

  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <Container>
      <BrowserRouter>
      <Buttons/>
        <div className="screens">
          <Routes>
            <Route path="/" element={<Exploration/>}/>
            <Route path="create-exp" element={<CreateExperience/>}/>
            <Route path="profile" element={<Profile/>}/>
                <Route path="account" element={<Account/>}/>
                <Route path="UserExperiences" element={<UserExperiences/>}/>
                    <Route path="updateexperience" element={<UpdateExperience/>}/>
                <Route path="favorites" element={<Favorites/>}/>
                <Route path="ratings" element={<Ratings/>}/>
                <Route path="trips" element={<Trips setTripObject={setTripObject}/>}/>
                  <Route path="trips/trip" element={<Trip tripObject={tripObject}/>}/>
                  <Route path="trips/create-trip" element={<CreateTrip/>}/>
                  <Route path="trips/trip/update-trip" element={<UpdateTrip tripObject={tripObject}/>}/>
          </Routes>
        </div>
      </BrowserRouter>
      </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;