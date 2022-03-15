import './App.css';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';
import { UserProvider } from '../../contexts/user.context';

function App(props: any) {
  return <UserProvider>
    <div className="App" >
      <NavigationBar />
      <Outlet />
    </div>
  </UserProvider>
}

export default App;
