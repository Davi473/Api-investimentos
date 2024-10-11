import RegisterDB from "../config/dbConnect";

export interface Lancamento 
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
                            l.id AS id,
                            a.ticket AS ticket,
                            a.tipo AS tipo,
                            l.quantidade,
                            l.preco,
                            l.data,
                            CASE 
                                WHEN l.compra = true THEN 'compra'
                                ELSE 'venda'
                            END AS operacao
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
                       VALUES ($1, $2, $3, $4, $5, $6)
                        `;
        await this.registerDB.query(query, 
            [
                newLancamento.ativo, newLancamento.user, newLancamento.quantidade,
                newLancamento.preco, newLancamento.data, newLancamento.compra
            ]);
    }
}