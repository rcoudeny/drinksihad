import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterRoute from './routes/Authentication/Register.route';
import LoginRoute from './routes/Authentication/Login.route';
import HomeRoute from './routes/Home/Home.route';
import App from './components/App/App';
import GroupsRoute from './routes/Groups/Overview/Groups.route';
import { ROUTE_CREATE_GROUP, ROUTE_GROUPS, ROUTE_GROUP_DETAIL, ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_SEARCH_GROUP } from './service/constants';
import CreateGroupRoute from './routes/Groups/CreateGroup.route';
import SearchGroupRoute from './routes/Groups/SearchGroup.route';
import GroupDetail from './routes/Groups/Detail/GroupDetail.route';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomeRoute />} />
        <Route path={ROUTE_LOGIN.substring(1)} element={<LoginRoute />} />
        <Route path={ROUTE_REGISTER.substring(1)} element={<RegisterRoute />} />
        <Route path={ROUTE_GROUPS.substring(1)} element={<GroupsRoute />} />
        <Route path={ROUTE_CREATE_GROUP.substring(1)} element={<CreateGroupRoute />} />
        <Route path={ROUTE_SEARCH_GROUP.substring(1)} element={<SearchGroupRoute />} />
        <Route path={ROUTE_GROUP_DETAIL.substring(1)} element={<GroupDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
