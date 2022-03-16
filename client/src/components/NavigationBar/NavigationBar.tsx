import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserActionType, UserContext } from "../../contexts/user.context";
import { User } from "../../models/UserDTO";
import { ROUTE_LOGIN } from "../../service/constants";
import './NavigationBar.css';

export default function NavigationBar() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const logout = () => {
        userContext.dispatch({ type: UserActionType.LOGOUT, payload: null });
        navigate(ROUTE_LOGIN);
    }
    return (
        <div className="navigationContainer">
            <div className="navigationWrapper"><Link to="/"><h1>DrinksIHad</h1></Link>
                <nav>
                    {!!userContext.state.user ? <LoggedInNav user={userContext.state.user} logout={logout} /> : <DefaultNav />}
                </nav>
            </div>
        </div>
    )
}

interface LoggedInContext {
    user: User,
    logout: () => void
}

function LoggedInNav(userContext: LoggedInContext) {
    return (
        <React.Fragment>
            <Link to="/groups">Groups</Link> | <button onClick={userContext.logout}>Logout</button> | {"Welcome " + userContext.user.username}
        </React.Fragment>
    )
}

function DefaultNav() {
    return (
        <React.Fragment>
            <Link to="/login">Login</Link> |
            <Link to="/register">Register</Link>
        </React.Fragment>
    );
}