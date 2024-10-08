import CarteiraService from "./carteiraService";

export default class carteiraController
{
    constructor(private carteiraService: CarteiraService) {}

    public async getCarteira(req: any, res: any)
    {
        try {
            const { id } = req.user;
            const carteira = await this.carteiraService.getCarteira(id); 
            res.status(200).json({ message: "Seus carteira", carteira: carteira});
        } catch (err: any) {
            res.status(500).json({ message: `${err.message} -- falha na requisição` });
        }
    }
    /*
    public gerarExcel(req: any res: any)
    {
        try {

        } catch (err: any) {

        }
    }
    */
}