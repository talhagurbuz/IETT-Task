import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import './App.css';
import Endpoints from './pages/Endpoints';
import ListOfTables from './pages/ListOfTables';
import Chops from './pages/Chops';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/endpoints" element={<Endpoints />} />
          <Route path="/listoftables" element={<ListOfTables />} />
          <Route path="/chops" element={<Chops />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
