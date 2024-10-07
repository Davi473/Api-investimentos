import LancamentoService from "./lancamentoService";


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
        console.log(req.body);
        console.log(req.user)
        //const newLancamento = {ativo.}
        //await this.lancamentoService.newLancamento();
        res.status(201).json({ message: "Adicionado Com Sucesso"});
    }
}