import RegisterDB from "../config/dbConnect";

export interface Carteira 
{
    ativo: number, usuario: number,
    quantidade: number, media: number
}

export default class CarteiraModel
{   
    constructor(private registerDB: RegisterDB) {}

    public async getCarteira(id: number)
    {
        const query = `SELECT 
                            c.id AS  carteira_id,
                            a.ticket AS ticket,
                            a.tipo AS tipo,
                            c.quantidade,
                            c.media
                        FROM 
                            ativo_carteira c
                        JOIN 
                            usuarios u ON c.id_usuario = u.id
                        JOIN
                            ativo a ON c.id_ativo = a.id
                        WHERE
                            c.id_usuario = $1
                        ORDER BY
                            a.tipo,
                            a.ticket
                        `;
        const carteira = this.registerDB.query(query, [id]);
        return carteira;
    }

    public async newCarteira(carteira: Carteira)
    {
        const query = `INSERT INTO ativo_carteira (id_ativo, id_usuario, quantidade, media)
                       VALUES ($1, $2, $3, $4)
                        `;
        await this.registerDB.query(query, 
            [
                carteira.ativo, carteira.usuario,
                carteira.quantidade, carteira.media
            ]);
    }

    public async updateCarteira(carteira: Carteira)
    {
        const query = `UPDATE ativo_carteira
                        SET quantidade = $1,
                            media = $2
                        WHERE 
                            id = $3 AND 
                            id_ativo = $4`
        await this.registerDB.query(query,
            [
                carteira.quantidade, carteira.media,
                carteira.usuario, carteira.ativo
            ]);
    }

    public async getCarteiraTicket(id: number, ticket: number)
    {
        const query = `SELECT 
                            c.id AS  carteira_id,
                            a.ticket AS ticket,
                            a.tipo AS tipo,
                            c.quantidade,
                            c.media
                        FROM 
                            ativo_carteira c
                        JOIN 
                            usuarios u ON c.id_usuario = u.id
                        JOIN
                            ativo a ON c.id_ativo = a.id
                        WHERE
                            c.id_usuario = $1 AND c.id_ativo = $2`;
        const carteira = await this.registerDB.query(query, [id, ticket]);
        return carteira[0];
    }
}