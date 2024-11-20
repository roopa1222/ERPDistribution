/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import * as XLSX from 'xlsx';


const jsonToExcel = (jsonData: any[]) => {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const excelBuffer: Buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  return excelBuffer;
};

export default jsonToExcel;
