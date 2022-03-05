import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../../models/UserDTO";
import { UserContext } from "../App/contexts";
import './NavigationBar.css';

export default function NavigationBar() {
    const userContext = useContext(UserContext);
    const user = userContext.user;
    const logout = userContext.logout;
    return (
        <div className="navigationContainer">
            <div className="navigationWrapper"><Link to="/"><h1>Bookkeeper</h1></Link>
                <nav>
                    {!!user ? <LoggedInNav user={user} logout={logout} /> : <DefaultNav />}
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