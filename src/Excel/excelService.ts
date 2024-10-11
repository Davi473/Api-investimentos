import XLSX from "xlsx";

export default class ExcelService
{
  public async gerarExcel(data: Object[])
  {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Dados');

    const excelBuffer = await XLSX.write(workBook, { bookType: "xlsx", type: "buffer"});
    return(excelBuffer);
  }
}

