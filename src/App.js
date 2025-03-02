import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import ExpensePage from './pages/ExpensePage';
import IncomePage from './pages/IncomePage';
import StatsPage from './pages/StatsPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';

function App() {
  return (

      <div className="App">
      
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensePage />} />
          <Route path="/incomes" element={<IncomePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/about" element={<AboutPage />}/>

        </Routes>
        <Footer />
      </div>
 
  );
}

export default App;

