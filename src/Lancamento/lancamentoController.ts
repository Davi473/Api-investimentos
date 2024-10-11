import LancamentoService from "./lancamentoService";
import ExcelService from "../Excel/excelService";

export default class LancamentoController
{
    constructor(private lancamentoService: LancamentoService) {}

    public async getLancamento(req: any, res: any)
    {
        try {
            const { id } = req.user;
            const lancamentos = await this.lancamentoService.getLancamento(id); 
            res.status(200).json({ message: "Seus lancamentos", lancamentos: lancamentos});
        } catch (err: any) {
            res.status(500).json({ message: `${err.message} -- falha na requisição` });
        }
    }

    public async newLancamento(req: any, res: any)
    {
        try {
            const { ticket, quantidade, preco, data, compra } = req.body;
            const { id, name } = req.user;
            const newLancamento = {ticket: ticket, user: id, quantidade: quantidade, preco: preco, data: data, compra: compra}
            const lancamento = await this.lancamentoService.newLancamento(newLancamento);
            res.status(lancamento[0]).json(lancamento[1]);
        } catch (err: any) {
            res.status(500).json({ message: `${err.message} -- falha no momento de adicionar` });
        }
    }
    
    public async excelLancamento(req: any, res: any)
    {
        try {
            const {id} =  { id: 1};//req.user;
            const colunas = await this.lancamentoService.gerarExcel(id);
            const excel = await new ExcelService().gerarExcel(colunas);
            //await new ExcelService().gerarExcel(colunas[0], colunas[1], res);
            res.setHeader('Content-Disposition', 'attachment; filename="dados.xlsx"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.status(200).send(excel);
        } catch (err: any) {
            res.status(500).json({ message: `${err.message} - falha no excel`})
        }
    }
}
