import AtivoModel from "../Ativo/ativoModel";
import Media from "../CarcularCarteira/calcularCarteira";
import CarteiraModel from "../Carteira/carteiraModel";
import LancamentoModel from "./lancamentoModel";

export default class LancamentoService
{
    constructor(
        private lancamentoModel: LancamentoModel,
        private ativoModel: AtivoModel,
        private carteriraModel: CarteiraModel
    ) {}

    public async getLancamento(id: number)
    {
        const lancamentos = await this.lancamentoModel.getLancamento(id);
        return lancamentos;
    }

    // Falta terminar
    public async newLancamento(
        lancamento: {
            ticket: string, user: number,
            quantidade: number, preco: number,
            data: Date, compra: boolean
            }
    ) {
        const id_ativo = await this.ativoModel.getAtivoTicket(lancamento.ticket);
        if(!id_ativo)
        {
            return [301, {message: "Esse ativo não existe"}]
        }

        const carteiraExist = await this.carteriraModel.getCarteiraTicket(id_ativo.id, lancamento.user);
        const newLancamento = {
            ativo: id_ativo.id, user: lancamento.user, quantidade: lancamento.quantidade,
            preco: lancamento.preco, data: lancamento.data, compra: lancamento.compra
        }

        if(!!carteiraExist)
        {
            if(!(lancamento.compra === false && carteiraExist.quantidade === 0))
            {
                const valoresDeMedia = new Media(carteiraExist, newLancamento);
                const media = valoresDeMedia.media();

                await this.lancamentoModel.newLancamento(newLancamento);
                await this.carteriraModel.updateCarteira(
                    {
                        ativo: id_ativo.id, usuario: lancamento.user,
                        quantidade: media.quantidade, media: media.media
                    });

            } else {

                return [301, {message: "Você não pode adicinar uma venda sem ativos na carteira"}];

            }   

        } else  {

            await this.carteriraModel.newCarteira(
                {
                    ativo: id_ativo.id, usuario: lancamento.user, 
                    quantidade: lancamento.quantidade, media: lancamento.preco
                });  
        }
        const carteiraAtual = await this.carteriraModel.getCarteiraTicket(id_ativo.id, lancamento.user);
        return [201, {message: "Media do ativo atualmente", carteria: carteiraAtual}];

    }

    public async gerarExcel(user: number): Promise<[Object[], Object[]]>
    {
        const lancamentos = await this.lancamentoModel.getLancamento(user);

        const coluna: Object[] = [
            { header: 'ID', key: 'nome', width: 30 },
            { header: 'TICKET', key: 'idade', width: 10 },
            { header: 'TIPO', key: 'cidade', width: 30 },
            { header: 'QUANTIDADE', key: 'cidade', width: 30 },
            { header: 'PRECO', key: 'cidade', width: 30 },
            { header: 'DATA', key: 'cidade', width: 30 },
            { header: 'OPERACAO', key: 'cidade', width: 30 }
        ];
        
        const dados: Object[] = []
        for( let i = 0; i < lancamentos.length; i++)
        {
            const object = {"ID": null, "TICKET": null, "TIPO": null, "QUANTIDADE": null, "PRECO": null, "DATA": null, "OPERACAO": null};
            object["ID"] = lancamentos[i].lancamento_id;
            object["TICKET"] = lancamentos[i].ticket;
            object["TIPO"] = lancamentos[i].tipo;
            object["QUANTIDADE"] = lancamentos[i].quantidade;
            object["PRECO"] = lancamentos[i].preco;
            object["DATA"] = lancamentos[i].data;
            object["OPERACAO"] = lancamentos[i].operacao

            dados.push(object)
        }

    
        return [coluna, dados];
    }
}