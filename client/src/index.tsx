import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './routes/Authentication/Register';
import Login from './routes/Authentication/Login';
import Home from './routes/Home/Home';
import App from './components/App/App';
import Groups from './routes/Groups/GroupsOverview';
import { ROUTE_GROUPS, ROUTE_LOGIN, ROUTE_REGISTER } from './service/constants';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path={ROUTE_LOGIN} element={<Login />} />
        <Route path={ROUTE_REGISTER} element={<Register />} />
        <Route path={ROUTE_GROUPS} element={<Groups />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
