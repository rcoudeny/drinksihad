import { NavLink, Outlet } from "react-router-dom";
import { getInvoices } from "../../data/invoices";

export default function Invoices() {
    let invoices = getInvoices();

    return (
        <div style={{ display: "flex" }}>
            <nav
                style={{
                    borderRight: "solid 1px",
                    padding: "1rem"
                }}
            >
                {invoices.map(invoice => (
                    <NavLink
                        style={({ isActive }) => {
                            return {
                                display: "block",
                                margin: "1rem 0",
                                color: isActive ? "red" : ""
                            };
                        }}
                        to={`/invoices/${invoice.id}`}
                        key={invoice.id}
                    >
                        {invoice.name}
                    </NavLink>
                ))}
            </nav>
            <Outlet />
        </div>
    );
}