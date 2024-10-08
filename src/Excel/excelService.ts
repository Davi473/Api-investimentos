import ExcelJS from "exceljs";

export default class ExcelService
{
    public async gerarExcel(colunas: Object[], dados: Object[], res: any)
    {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Planilha1');

        // Adicionar cabeçalhos
        worksheet.columns = colunas;
        /*
        [
            { header: 'Nome', key: 'nome', width: 30 },
            { header: 'Idade', key: 'idade', width: 10 },
            { header: 'Cidade', key: 'cidade', width: 30 },
        ];
        */

        // Dados a serem adicionados
        const data = dados;
        /*
        [
            { nome: "Alice", idade: 30, cidade: "São Paulo" },
            { nome: "Bob", idade: 25, cidade: "Rio de Janeiro" },
            { nome: "Charlie", idade: 35, cidade: "Belo Horizonte" },
        ];
        */

        // Adicionar dados à planilha
        data.forEach(item => {
            worksheet.addRow(item);
        });

        // Definir cabeçalhos de resposta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=tabela.xlsx');

        // Enviar o arquivo Excel na resposta
        await workbook.xlsx.write(res);
    }
}