import React, { useState, useEffect } from 'react';
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
import Buttons from './components/Buttons.js';

function App() {

  const [experienceToUpdate, setExperienceToUpdate] = useState([])
  const [favoriteToUpdate, setUserFavorites] = useState([])

  return (
    <div className="App">
      <BrowserRouter>
      <Buttons />
        <div className="screens">
          <Routes>
            <Route
              path="/"
              element={ <Exploration/> }
            />
            <Route
              path="/create-exp"
              element={ <CreateExperience/> }
            />
            <Route
              path="/profile"
              element={ <Profile/> }
            />
                <Route
                  path="/account"
                  element={ <Account/> }
                />
                <Route
                  path="/UserExperiences"
                  element={ <UserExperiences setExperienceToUpdate={setExperienceToUpdate}/> }
                />
                    <Route
                      path="/UserExperiences/updateexperience"
                      element={ <UpdateExperience experienceToUpdate={experienceToUpdate} setExperienceToUpdate={setExperienceToUpdate}/> }
                    />
                <Route
                  path="/favorites"
                  element={ <Favorites favoriteToUpdate={favoriteToUpdate} setUserFavorites={setUserFavorites} /> }
                />
                <Route
                  path="/ratings"
                  element={ <Ratings/> }
                />
                <Route
                  path="/trips"
                  element={ <Trips/> }
                />
                <Route
                  path="/sometrip"
                  element={ <Trip/> }
                />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;