'use client';

import Invoice, {InvoiceProps} from "@/app/components/Invoice";

export default function InvoicePage() {
    const defaultProps: InvoiceProps = {
        invoicingCompany: {
            companyAddress: '4 Cranley Road, Bangor',
            phoneNumber: '07434345342',
            email: 'richard@letsgetlogan.com',
        },
        date: new Date(),
    }
    return <>
        <div>
            <p className="text-xl font-bold text-center p-3">Invoice Preview</p>
            <Invoice {...defaultProps} />
        </div>
    </>
}