import dsrInvoiceModel from "../db/models/dsrInvoice";


export const createDsrInvoice = async (data: object) => {
  const dsrInvoice = await dsrInvoiceModel.create(data);
  return dsrInvoice;
};

// export const getAllDsrInvoice = async (branchId?: string, from?: string, to?: string) => {
// }

export const updateDsrInvoice = async (id: string, data: object) => {
  const dsrInvoice = await dsrInvoiceModel.findByIdAndUpdate( { _id: id }, data, { new: true });
  return dsrInvoice;

};