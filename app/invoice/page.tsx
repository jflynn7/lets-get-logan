'use client';

import Invoice, {InvoiceProps} from "@/app/components/Invoice";
import InvoiceForm from "@/app/components/InvoiceForm";
import {useState} from "react";
import html2PDF from 'jspdf-html2canvas';

const invoiceStoragePrefix = `lpm_invoices_`;

export default function InvoicePage() {
    const defaultProps: Partial<InvoiceProps> = {
        invoicingCompany: {
            companyAddress: '4 Cranley Road, Bangor',
            phoneNumber: '07434345342',
            email: 'richard@letsgetlogan.com',
        },
        date: new Date().toDateString(),
    }

    function loadItemsWithPrefix() {
        const keys = Object.keys(localStorage).filter(key => key.startsWith(invoiceStoragePrefix));
        const items = {};

        for (let key of keys) {
            // @ts-ignore
            items[key] = localStorage.getItem(key);
        }

        return items;
    }

    console.log(loadItemsWithPrefix());

    const [invoiceProps, setInvoiceProps] = useState(defaultProps)
    const [invoiceRef, setInvoiceRef] = useState(null);
    const storeInvoiceDetailsAndClear = () => {
        if (invoiceProps.invoicedJob?.workOrderNumber) {
            localStorage.setItem(`${invoiceStoragePrefix}${invoiceProps.invoicedJob?.workOrderNumber}`, JSON.stringify(invoiceProps));
        }
    }
    const handlePrint = () => {
        if (invoiceRef) {
            html2PDF(invoiceRef, {
                jsPDF: {
                    format: 'a4',
                },
                imageType: 'image/jpeg',
                output: './pdf/generate.pdf'
            }).then(() => storeInvoiceDetailsAndClear());
        }
    }
    return <>
        <div>
            <p className="text-xl font-bold text-center p-3 mb-4">Create Invoice</p>
            <InvoiceForm onSubmit={setInvoiceProps} invoiceDetails={invoiceProps} />
            <p className="text-xl font-bold text-center p-3 mb-4 mt-4">Invoice Preview</p>
            <Invoice setRef={setInvoiceRef} {...invoiceProps} />
            <div className="content-center mt-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <button
                    className="hidden-print bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handlePrint}>Print Invoice
                </button>
            </div>
        </div>
    </>
}