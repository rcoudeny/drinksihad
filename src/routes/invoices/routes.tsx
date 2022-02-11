import React from "react";
import { Route } from "react-router-dom";
import Invoice from "./invoice";
import Invoices from "./invoices";

export default function InvoiceRoutes() {
    return (
        <React.Fragment>
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices" element={<Invoices />}>
                <Route path=":invoiceId" element={<Invoice />} />
            </Route>
        </React.Fragment>
    )
}