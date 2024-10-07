import RegisterDB from "../config/dbConnect";

interface Lancamento 
{
    ativo: number; user: number;
    quantidade: number; preco: number;
    data: Date; compra: boolean
}

export default class LancamentoModel
{   
    constructor(private registerDB: RegisterDB) {}

    public async getLancamento(id: number)
    {
        const query = `SELECT 
                            l.id AS lancamento_id,
                            u.name AS usuario_nome,
                            a.ticket AS ativo_ticket,
                            l.quantidade,
                            l.preco,
                            l.data,
                            l.compra
                        FROM 
                            lancamento l
                        JOIN 
                            usuarios u ON l.id_usuario = u.id
                        JOIN 
                            ativo a ON l.id_ativo = a.id
                        WHERE 
                            l.id_usuario = $1; 
                        `;
        const lancamento = this.registerDB.query(query, [id]);
        return lancamento;
    }

    public async newLancamento(newLancamento: Lancamento)
    {
        const query = `INSERT INTO lancamento (id_ativo, id_usuario, quantidade, preco, data, compra)
                       VALUES ($1, $2, $3, $4, $5)
                        `;
        await this.registerDB.query(query, 
            [
                newLancamento.ativo, newLancamento.user, newLancamento.quantidade,
                newLancamento.preco, newLancamento.data, newLancamento.compra
            ]);
    }
}