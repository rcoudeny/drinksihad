import { useParams } from "react-router-dom"
import { getInvoice } from "../../data/invoices";

export default function Invoice() {
    let params = useParams();
    if (params.invoiceId) {

        let invoice = getInvoice(parseInt(params.invoiceId));
        if (invoice) {
            return (
                <main style={{ padding: "1rem" }}>
                    <h2>Total Due: {invoice.amount}</h2>
                    <p>
                        {invoice.name}: {invoice.id}
                    </p>
                    <p>Due Date: {invoice.due}</p>
                </main>)
        } else {
            return <div>No invoice found with id: {params.invoiceId}</div>
        }
    } else {
        return <div>No valid is was given</div>
    }
}