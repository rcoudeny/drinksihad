import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';
import { UserContext } from './contexts';
import React from 'react';
import { User } from '../../models/UserDTO';
import { ROUTE_GROUPS, ROUTE_LOGIN } from '../../service/constants';
import ApiService from '../../service/api.service';

interface StateInterface {
  user: User | null
}

class AppLogic extends React.Component<{ navigate: any }, StateInterface> {


  constructor(props: any) {
    super(props);
    this.state = {
      user: ApiService.currentUser()
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    ApiService.setToken("");
    this.setState({ user: null });
    this.props.navigate(ROUTE_LOGIN);
  }

  login(user: User) {
    this.setState({ user: user });
    this.props.navigate(ROUTE_GROUPS);
  }

  render() {
    const value = {
      user: this.state.user,
      logout: this.logout,
      login: this.login
    }
    return (
      <UserContext.Provider value={value}>
        <div className="App" >
          <NavigationBar />
          <Outlet />
        </div>
      </UserContext.Provider>
    );
  }
}

function App(props: any) {
  const navigate = useNavigate();
  return <AppLogic {...props} navigate={navigate}></AppLogic>
}

export default App;
