'use client';

import Image from "next/image";

export interface InvoiceRecipient {
    name: string;
    address: string;
    phone: string;
    email?: string;
}

export interface InvoicingCompany {
    companyAddress: string;
    phoneNumber: string;
    email: string;
}

export interface InvoiceProps {
    invoicingCompany: InvoicingCompany;
    date: Date;
}
export default function Invoice(invoiceProps: InvoiceProps): JSX.Element {
    const { invoicingCompany, date } = invoiceProps;
    return <>
        <div className="invoice max-w-2xl mx-auto p-6 bg-white text-black shadow-lg">
            <div className="flex">
                <div className="w-1/4">
                    <Image alt={'LPM Logo'} src={'/lpm-logo.jpg'} width={800} height={800} />
                </div>
                <div className="w-3/4 left-1/2 text-right">
                    <h1 className="text-3xl font-bold">Logan Property Maintenance</h1>
                    <p>{invoicingCompany.companyAddress}</p>
                    <p>Phone: {invoicingCompany.phoneNumber}</p>
                    <p>Email: {invoicingCompany.email}</p>
                    <p>Date: {date.toLocaleDateString()}</p>
                </div>
            </div>
            <div className="flex mt-6">
                <div className="w-1/2">
                    <h2 className="text-lg font-bold">To:</h2>
                    <p>Recipient Name</p>
                    <p>Recipient Address</p>
                    <p>Phone: 987-654-3210</p>
                    <p>Email: recipient@example.com</p>
                </div>
                <div className="w-1/2">
                    <h2 className="text-lg font-bold">For:</h2>
                    <p>Job Site Name</p>
                    <p>Job Site Address</p>
                    <p>Work Order Number: WO123456</p>
                </div>
            </div>
            <div className="invoice-details mt-6">
                <table className="w-full">
                    <tbody>
                    <tr>
                        <th className="bg-gray-100 p-4 text-left">Description</th>
                        <th className="bg-gray-100 p-4 text-right">Amount</th>
                    </tr>
                    <tr>
                        <td className="p-4 text-left">Item 1</td>
                        <td className="p-4 text-right">$10.00</td>
                    </tr>
                    <tr>
                        <td className="p-4 text-left">Item 2</td>
                        <td className="p-4 text-right">$5.00</td>
                    </tr>
                    <tr>
                        <td className="font-bold p-4 text-left">Total</td>
                        <td className="font-bold p-4 text-right">$15.00</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="payment-details mt-6">
                <h2 className="text-lg font-bold">Payment Details:</h2>
                <p>Bank: Your Bank Name</p>
                <p>Account Number: 1234567890</p>
                <p>Invoice Reference: INV123456</p>
            </div>
        </div>

        <button className="hidden-print bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => window.print()}>Print Invoice
        </button>
    </>;
}