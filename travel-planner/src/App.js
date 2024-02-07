import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
import Search from './screens/Search';

function App() {

  const [experienceToUpdate, setExperienceToUpdate] = useState([])
  const [favoriteToUpdate, setUserFavorites] = useState([])
  const [experienceObject, setExperienceObject] = useState()
  const [tripObject, setTripObject] = useState()

  return (
    <div className="App">
      <BrowserRouter>
      <Buttons/>
        <div className="screens">
          <Routes>
            <Route path="/" element={<Exploration/>}/>
            <Route path="create-exp" element={<CreateExperience/>}/>
            <Route path="profile" element={<Profile/>}/>
                <Route path="account" element={<Account/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="UserExperiences" element={<UserExperiences setExperienceToUpdate={setExperienceToUpdate}/>}/>
                    <Route path="updateexperience" element={<UpdateExperience experienceToUpdate={experienceToUpdate} setExperienceToUpdate={setExperienceToUpdate}/>}/>
                <Route path="favorites" element={<Favorites favoriteToUpdate={favoriteToUpdate} setUserFavorites={setUserFavorites}/>}/>
                <Route path="ratings" element={<Ratings/>}/>
                <Route path="trips" element={<Trips setTripObject={setTripObject}/>}/>
                  <Route path="trips/trip" element={<Trip tripObject={tripObject}/>}/>
                  <Route path="trips/create-trip" element={<CreateTrip/>}/>
                  <Route path="trips/trip/update-trip" element={<UpdateTrip tripObject={tripObject}/>}/>
                <Route path="search" element={<Search/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;