import pgPromise, { IDatabase, IMain } from 'pg-promise';

interface Database extends IDatabase<{}> {}

export default class RegisterDB {
  private db: Database;

  constructor () 
  {
    const pgp: IMain = pgPromise();

    if(!process.env.DB_CONNECTION_STRING)
    {
        throw new Error("Banco não registrado")
    }

    this.db = pgp(process.env.DB_CONNECTION_STRING);
  }

  public async query(statement: string, params?: any[]) 
  {
    const saida = await this.db.query(statement, params);
    return saida;
  }
}