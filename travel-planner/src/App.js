import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// screens and components
import Exploration from './screens/Exploration'
import Experience from './components/Experience';

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;