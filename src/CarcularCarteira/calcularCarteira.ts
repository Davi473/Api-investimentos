import { Carteira } from "../Carteira/carteiraModel";
import { Lancamento } from "../Lancamento/lancamentoModel";

export default class Media
{
    private quantidade: number;
    private precoMedio: number;

    constructor (
        private carteira: Carteira,
        private lancamento: Lancamento
    ) {
        this.quantidade = 0;
        this.precoMedio = 0;
        this.getConsolidado();
    }

    private getConsolidado(): void
    { 
        if(this.lancamento.compra == true)
        {
            this.quantidade = this.carteira.quantidade + this.lancamento.quantidade;
            const valorTotalCarteira = this.carteira.quantidade * this.carteira.media;
            const valorTotalLancamento = this.lancamento.quantidade * this.lancamento.preco;
            const mediaTotal = (valorTotalCarteira + valorTotalLancamento) / this.quantidade;
            this.precoMedio = mediaTotal;
        } else {
            this.quantidade = this.carteira.quantidade - this.lancamento.quantidade;
            const valorTotalCarteira = this.carteira.quantidade * this.carteira.media;
            const valorTotalLancamento = this.lancamento.quantidade * this.lancamento.preco;
            const mediaTotal = (valorTotalCarteira - valorTotalLancamento) / this.quantidade;
            this.precoMedio = mediaTotal;
        }
    }   

    public media()
    {
        return { media: this.precoMedio, quantidade: this.quantidade};
    }
}