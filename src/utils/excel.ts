/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import * as XLSX from 'xlsx';

export const jsonToCsv = (jsonData: any[]): Buffer => {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write the workbook as a CSV buffer
  const excelBuffer: Buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'csv' });
  return excelBuffer;
};
