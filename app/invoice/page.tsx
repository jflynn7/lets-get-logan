'use client';

import Invoice, {InvoiceProps} from "@/app/components/Invoice";
import InvoiceForm from "@/app/components/InvoiceForm";
import {useState} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

    const [invoiceProps, setInvoiceProps] = useState(defaultProps)
    const [invoiceRef, setInvoiceRef] = useState(null);

    const handlePrint = async () => {
        if (invoiceRef) {

            const canvas = await html2canvas(invoiceRef);
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            let targetWidth, targetHeight;

            if (imgWidth / imgHeight > pdfWidth / pdfHeight) {
                targetWidth = pdfWidth;
                targetHeight = (imgHeight * pdfWidth) / imgWidth;
            } else {
                targetHeight = pdfHeight;
                targetWidth = (imgWidth * pdfHeight) / imgHeight;
            }

            pdf.addImage(imgData, 'PNG', 0, 0, targetWidth, targetHeight);
            pdf.save('converted.pdf');
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