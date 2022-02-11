import { Link } from "react-router-dom";
import './NavigationBar.css';

export default function NavigationBar() {
    return (
        <div>
            <Link to="/"><h1>Bookkeeper</h1></Link>
            <nav>
                <Link to="/login">Login</Link> |{" "}
                <Link to="/register">Register</Link>
            </nav>
        </div>
    )
}