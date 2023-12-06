import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// screens and components
import Exploration from './screens/Exploration'
import CreateExperience from './screens/CreateExperience'
import Experience from './components/Experience';
import ExperienceList from './components/ExperienceList';

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