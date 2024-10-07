import LancamentoModel from "./lancamentoModel";

export default class LancamentoService
{
    constructor(
        private lancamentoModel: LancamentoModel
    ) {}

    public async getLancamento(id: number)
    {
        const lancamentos = await this.lancamentoModel.getLancamento(id);
        return lancamentos;
    }

    public async newLancamento(
        lancamento: {
            ativo: number, user: number,
            quantidade: number, preco: number,
            data: Date, compra: boolean
            }
    ) {
        const id_ativo = await this.lancamentoModel.newLancamento(lancamento);
    }
}