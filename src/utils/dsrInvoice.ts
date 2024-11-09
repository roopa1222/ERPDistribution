import dsrInvoiceModel from "../db/models/dsrInvoice";


export const createDsrInvoice = async (data: object) => {
    const dsrInvoice = await dsrInvoiceModel.create(data);
    return dsrInvoice;
}