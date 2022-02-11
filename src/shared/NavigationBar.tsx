import { Link } from "react-router-dom";
interface Props {
}
function NavigationBar(props: Props) {
    return (
        <div>
            <Link to='/'><h1>Bookkeeper</h1></Link>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem"
                }}
            >
                <Link to="/invoices">Invoices</Link> |{" "}
                <Link to="/expenses">Expenses</Link>
            </nav>
        </div>
    );
}

export default NavigationBar;