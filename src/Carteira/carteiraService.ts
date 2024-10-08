import CarteiraModel from "./carteiraModel";

export default class LancamentoService
{
    constructor(
        private carteiraModel: CarteiraModel,
    ) {}

    public async getCarteira(usuario: number) 
    {
        const carteira = await this.carteiraModel.getCarteira(usuario);
        return carteira;
    }
}