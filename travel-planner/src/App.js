import React from 'react';
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
                  element={ <UserExperiences/> }
                />
                <Route
                  path="/favorites"
                  element={ <Favorites/> }
                />
                <Route
                  path="/ratings"
                  element={ <Ratings/> }
                />
                <Route
                  path="/trips"
                  element={ <Trips/> }
                />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;