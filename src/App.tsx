import React from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './shared/Test';
import NavigationBar from './shared/NavigationBar';
import { Outlet } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <NavigationBar>

      </NavigationBar>
      <Outlet />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. <Test text={'Kga u pestend'}></Test>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
