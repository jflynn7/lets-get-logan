import {InvoiceProps, JobItem} from "@/app/components/Invoice";
import {ChangeEvent, useState} from "react";

interface InvoiceFormProps {
    onSubmit: Function;
    invoiceDetails: InvoiceProps
}

export default function InvoiceForm({ onSubmit, invoiceDetails }: InvoiceFormProps) {
    const [formData, setFormData]: [any, any] = useState({
        invoicingCompany: {
            companyAddress: '',
            phoneNumber: '',
            email: ''
        },
        invoiceRecipient: {
            name: '',
            address: '',
            phone: '',
            email: ''
        },
        invoicedJob: {
            jobName: '',
            jobAddress: '',
            workOrderNumber: ''
        },
        jobItems: [{ description: '', cost: 0 }],
        date: new Date().toLocaleDateString(),
        paymentDetails: {
            bankName: '',
            accountNumber: '',
            invoiceReference: '',
            sortCode: ''
        },
        ...invoiceDetails
    });

    const handleChange = (e: any) => {
        const { name, value, dataset } = e.target;
        if (dataset.section) {
            setFormData({
                ...formData,
                [dataset.section]: {
                    ...formData[dataset.section],
                    [name]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleJobItemChange = (index: any, e: any) => {
        const { name, value } = e.target;
        const jobItems = formData.jobItems.map((item: JobItem, i: number) =>
            i === index ? { ...item, [name]: value } : item
        );
        setFormData({ ...formData, jobItems });
    };

    const addJobItem = () => {
        setFormData({ ...formData, jobItems: [...formData.jobItems, { description: '', cost: 0 }] });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 invoice-form max-w-2xl mx-auto p-6 bg-white text-black shadow-lg">
            <div>
                <h2 className="text-lg font-bold">Invoicing Company</h2>
                <input
                    type="text"
                    name="companyAddress"
                    placeholder="Company Address"
                    value={formData.invoicingCompany.companyAddress}
                    onChange={handleChange}
                    data-section="invoicingCompany"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.invoicingCompany.phoneNumber}
                    onChange={handleChange}
                    data-section="invoicingCompany"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.invoicingCompany.email}
                    onChange={handleChange}
                    data-section="invoicingCompany"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
            </div>

            <div>
                <h2 className="text-lg font-bold">Invoice Recipient</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.invoiceRecipient.name}
                    onChange={handleChange}
                    data-section="invoiceRecipient"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.invoiceRecipient.address}
                    onChange={handleChange}
                    data-section="invoiceRecipient"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.invoiceRecipient.phone}
                    onChange={handleChange}
                    data-section="invoiceRecipient"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email (optional)"
                    value={formData.invoiceRecipient.email}
                    onChange={handleChange}
                    data-section="invoiceRecipient"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
            </div>

            <div>
                <h2 className="text-lg font-bold">Invoiced Job</h2>
                <input
                    type="text"
                    name="jobName"
                    placeholder="Job Name"
                    value={formData.invoicedJob.jobName}
                    onChange={handleChange}
                    data-section="invoicedJob"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
                <input
                    type="text"
                    name="jobAddress"
                    placeholder="Job Address"
                    value={formData.invoicedJob.jobAddress}
                    onChange={handleChange}
                    data-section="invoicedJob"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
                <input
                    type="text"
                    name="workOrderNumber"
                    placeholder="Work Order Number"
                    value={formData.invoicedJob.workOrderNumber}
                    onChange={handleChange}
                    data-section="invoicedJob"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
            </div>

            <div>
                <h2 className="text-lg font-bold">Job Items</h2>
                {formData.jobItems.map((item: any, index: number) => (
                    <div key={index} className="mb-4">
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={item.description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleJobItemChange(index, e)}
                            className="block w-full px-4 py-2 mt-2 border rounded-md"
                        />
                        <input
                            type="number"
                            step="0.01"
                            name="cost"
                            placeholder="Cost"
                            value={item.cost}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleJobItemChange(index, e)}
                            className="block w-full px-4 py-2 mt-2 border rounded-md"
                        />
                    </div>
                ))}
                <button type="button" onClick={addJobItem} className="px-4 py-2 bg-teal-700 text-white rounded-md">+</button>
            </div>

            <div>
                <h2 className="text-lg font-bold">Payment Details</h2>
                <hr className="mt-2 border-t border-gray-200"/>
                <input
                    type="text"
                    name="bankName"
                    placeholder="Bank Name"
                    value={formData.paymentDetails.bankName}
                    onChange={handleChange}
                    data-section="paymentDetails"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
                <input
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    value={formData.paymentDetails.accountNumber}
                    onChange={handleChange}
                    data-section="paymentDetails"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
                <input
                    type="text"
                    name="sortCode"
                    placeholder="Sort Code"
                    value={formData.paymentDetails.sortCode}
                    onChange={handleChange}
                    data-section="paymentDetails"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />

            </div>

            <div>
                <h2 className="text-lg font-bold">Invoice Details</h2>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
                <input
                    type="text"
                    name="invoiceReference"
                    placeholder="Invoice Reference"
                    value={formData.paymentDetails.invoiceReference}
                    onChange={handleChange}
                    data-section="paymentDetails"
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                />
            </div>

            <button type="submit" className="px-4 py-2 bg-teal-700 text-white rounded-md">Update Invoice</button>
        </form>
    );
}