'use client';

import Invoice, {InvoiceProps} from "@/app/components/Invoice";
import InvoiceForm from "@/app/components/InvoiceForm";
import {useState} from "react";

export default function InvoicePage() {
    const defaultProps: Partial<InvoiceProps> = {
        invoicingCompany: {
            companyAddress: '4 Cranley Road, Bangor',
            phoneNumber: '07434345342',
            email: 'richard@letsgetlogan.com',
        },
        date: new Date().toDateString(),
    }

    const [invoiceProps, setInvoiceProps] = useState(defaultProps)

    const handlePrint = () => {
        const printContent = document.getElementById('generated-invoice')?.innerHTML || "";
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
    }
    return <>
        <div>
            <p className="text-xl font-bold text-center p-3">Create Invoice</p>
            <InvoiceForm onSubmit={setInvoiceProps} />
            <p className="text-xl font-bold text-center p-3">Invoice Preview</p>
            <Invoice {...invoiceProps} />
            <div className="content-center">
                <button
                    className="hidden-print bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handlePrint}>Print Invoice
                </button>
            </div>
        </div>
    </>
}