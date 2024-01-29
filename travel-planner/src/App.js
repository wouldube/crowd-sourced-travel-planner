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
import { UpdateExperience } from './screens/UpdateExperience.js';
import Trip from './components/Trip.js';

function App() {

  // const [experiences, setUserExperiences] = useState([])

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
                      path="/updateexperience"
                      element={ <UpdateExperience/> }
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