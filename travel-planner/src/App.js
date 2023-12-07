import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// screens and components
import Exploration from './screens/Exploration'
import ExperiencesMap from './components/ExperiencesMap';
import ExperienceList from './components/ExperienceList';
import CreateExperience from './screens/CreateExperience'

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;