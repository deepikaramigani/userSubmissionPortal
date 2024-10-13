// src/App.j
import "./App.css"
import React from 'react';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import AdminLogin from "./components/AdminLogin.js";
import AdminDashboard from './components/AdminDashboard.js';
import UserForm from './components/UserForm.js';

function App() {
  return (
    <BrowserRouter>
    <div className ="container">
      <Routes>
      <Route path='/' element={<UserForm/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route exact path="/dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

