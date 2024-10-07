import RegisterDB from "../config/dbConnect";

interface Ativo
{
    id: number,
    tick: string,
    tipo: string,
}

export default class AtivoModel
{
    constructor(private registerDB: RegisterDB) {}

    public async getAtivos(): Promise<Ativo[]>
    {
        const query = "SELECT * FROM ativo";
        const ativos = this.registerDB.query(query);
        return ativos;
    }

    public async newAtivo(ativo: {tipo: string, ticket: string})
    {
        const query = "INSERT INTO ativo (ticket, tipo) VALUES ($1, $2)";
        await this.registerDB.query(query, [ativo.ticket, ativo.tipo]);
    }

    public async getAtivosTipo(tipo: string): Promise<Ativo[]>
    {
        const query = "SELECT name FROM usuarios WHERE tipo = $1";
        const ativo = await this.registerDB.query(query, [tipo]);
        return ativo
    }

    public async getAtivoTicket(ticket: string): Promise<Ativo>
    {
        const query = "SELECT * FROM ativo WHERE ticket = $1";
        const ativo = await this.registerDB.query(query, [ticket]);
        return ativo[0]
    }

    public async ativoAtualizadoTipo(tipo: string, id: number)
    {
        const query = "UPDATE ativo SET tipo = $1 WHERE id = $2";
        await this.registerDB.query(query, [tipo, id]);
    }

    public async ativoAtualizadoTicket(ticket: string, id: number)
    {
        const query = "UPDATE ativo SET ticket = $1 WHERE id = $2";
        await this.registerDB.query(query, [ticket, id]);
    }

    public async getAtivoId(id: number)
    {
        const query = "SELEC * FROM ativo WHERE id = $1";
        const ativo = await this.registerDB.query(query, [id]);
        return ativo;
    }
}