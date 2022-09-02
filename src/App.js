import React from 'react';

import Editor from './Editor';
import Home from './Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/editor/:page_id' element={<Editor/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
