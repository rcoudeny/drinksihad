import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Outlet />
    </div>
  );
}

export default App;
