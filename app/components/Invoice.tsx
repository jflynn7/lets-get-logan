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
    invoicingCompany?: InvoicingCompany;
    invoiceRecipient?: InvoiceRecipient;
    invoicedJob?: InvoiceJobDetails;
    jobItems?: JobItem[];
    date?: string;
    paymentDetails?: PaymentDetails;
}

export interface InvoiceJobDetails {
    jobName: string;
    jobAddress: string;
    workOrderNumber: string
}

export interface JobItem {
    description: string;
    cost: number;
}

export interface PaymentDetails {
    bankName: string;
    accountNumber: string;
    invoiceReference: string;
    sortCode: string;
}
export default function Invoice(invoiceProps: InvoiceProps): JSX.Element {
    const { invoicingCompany, paymentDetails, jobItems, invoiceRecipient, invoicedJob , date } = invoiceProps;
    return <>
        <div id={'generated-invoice'} className="invoice max-w-2xl mx-auto p-6 bg-white text-black shadow-lg">
            <div className="flex">
                <div className="w-1/4">
                    <Image alt={'LPM Logo'} src={'/lpm-logo.jpg'} width={800} height={800} />
                </div>
                <div className="w-3/4 left-1/2 text-right">
                    <h1 className="text-3xl font-bold">Logan Property Maintenance</h1>
                    <p>{invoicingCompany?.companyAddress}</p>
                    <p><strong>Phone:</strong> {invoicingCompany?.phoneNumber}</p>
                    <p><strong>Email:</strong> {invoicingCompany?.email}</p>
                    <p><strong>Date:</strong> {date}</p>
                </div>
            </div>
            <div className="flex mt-6">
                <div className="w-1/2">
                    <h2 className="text-lg font-bold">To:</h2>
                    <p><strong>{invoiceRecipient?.name}</strong></p>
                    <p>{invoiceRecipient?.address}</p>
                    { invoiceRecipient?.phone && <p><strong>Phone:</strong> {invoiceRecipient.phone}</p>}
                    { invoiceRecipient?.email && <p><strong>Email:</strong> {invoiceRecipient.email}</p>}
                </div>
                <div className="w-1/2">
                    <h2 className="text-lg font-bold">For:</h2>
                    <p>{invoicedJob?.jobName}</p>
                    <p>{invoicedJob?.jobAddress}</p>
                    <hr className="m-2"/>
                    <p><strong>Work Order Number:</strong> {invoicedJob?.workOrderNumber}</p>
                </div>
            </div>
            <div className="invoice-details mt-6">
                <table className="w-full">
                    <tbody>

                    <tr>
                        <th className="bg-gray-100 p-4 text-left">Description</th>
                        <th className="bg-gray-100 p-4 text-right">Amount</th>
                    </tr>
                    {jobItems?.map((item: JobItem, index: number) => {
                        return <tr key={index}>
                            <td id={`job-${index}`} className="p-4 text-left">{item.description}</td>
                            <td className="p-4 text-right">£{Number(item.cost || 0).toFixed(2)}</td>
                        </tr>
                    })}
                    <tr>
                        <td className="font-bold p-4 text-left">Total</td>
                        <td className="font-bold p-4 text-right">£{jobItems?.reduce((total: number, item: JobItem) => {
                            total += Number(item.cost);
                            return total;
                        }, 0).toFixed(2)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="payment-details mt-6">
                <h2 className="text-lg font-bold">Payment Details:</h2>
                <hr className="m-2"/>
                <p><strong>Bank:</strong> {paymentDetails?.bankName}</p>
                <p><strong>Account Number:</strong> {paymentDetails?.accountNumber}</p>
                <p><strong>Sort Code:</strong> {paymentDetails?.sortCode}</p>
                <hr className="m-2"/>
                <p><strong>Invoice Reference:</strong> {paymentDetails?.invoiceReference}</p>
            </div>
        </div>
    </>;
}