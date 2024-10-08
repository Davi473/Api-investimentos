import AtivoModel from "./ativoModel";

export default class AtivoService
{
    constructor(
        private ativoModel: AtivoModel
    ) {}

    public async getAtivos(): Promise<Object>
    {
        const ativo = await this.ativoModel.getAtivos();
        return ativo;
    }

    public async newAtivo(ativo: {ticket: string, tipo: string}): Promise<Object | string>
    {
        const verificacao = await this.ativoModel.getAtivoTicket(ativo.ticket);
        if(!verificacao)
        {
            await this.ativoModel.newAtivo(ativo);
            const verificacao = await this.ativoModel.getAtivoTicket(ativo.ticket);
            return verificacao;
        }
        return "Ja existe"
    }

    public async ativosTipo(tipo: string): Promise<Object>
    {
        const ativoTipo = this.ativoModel.getAtivosTipo(tipo);
        return ativoTipo;
    }

    public async ativoTicket(ticket: string)
    {
        const ativoTicket = this.ativoModel.getAtivoTicket(ticket);
        return ativoTicket;
    }

    public async ativoAtualizado(ativo: {ticket: string, tipo: string, id: number})
    {
        if(ativo.ticket)
        {
            await this.ativoModel.ativoAtualizadoTicket(ativo.ticket, ativo.id);
        } else if (ativo.tipo) {
            await this.ativoModel.ativoAtualizadoTipo(ativo.tipo, ativo.id);
        }
        const ativoAtualizado = await this.ativoModel.getAtivoId(ativo.id);
        return ativoAtualizado;
    }

    public async ativoId(id: number)
    {
        const ativoId = await this.ativoModel.getAtivoId(id);
        return ativoId;
    }
}