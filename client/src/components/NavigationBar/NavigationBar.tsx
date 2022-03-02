import { Link } from "react-router-dom";
import './NavigationBar.css';

export default function NavigationBar() {
    return (
        <div className="navigationContainer">
            <div className="navigationWrapper"><Link to="/"><h1>Bookkeeper</h1></Link>
                <nav>
                    <Link to="/groups">Groups</Link>
                    <Link to="/login">Login</Link> |{" "}
                    <Link to="/register">Register</Link>
                </nav></div>

        </div>
    )
}