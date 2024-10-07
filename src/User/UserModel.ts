import RegisterDB from "../config/dbConnect";

interface User
{
    id: number,
    name: string,
    hash: string,
    createdat: Date
}

export default class UserModel
{
    constructor(private registerDB: RegisterDB) {}

    public async getUsers(): Promise<User[]>
    {
        const query = "SELECT * FROM usuarios";
        const users = this.registerDB.query(query);
        return users;
    }

    public async userRegister(user: {name: string, hash: string, createdat: string})
    {
        console.log(user);
        const query = "INSERT INTO usuarios (name, hash, createdat) VALUES ($1, $2, $3)";
        await this.registerDB.query(query, [user.name, user.hash, user.createdat]);
    }

    public async getUserExistent(name: string): Promise<boolean>
    {
        const query = "SELECT name FROM usuarios WHERE name = $1";
        const nameUser = await this.registerDB.query(query, [name]);
        return nameUser[0] === undefined ? false: nameUser[0].name === name ? true: false;
    }

    public async getUser(name: string): Promise<User | undefined>
    {
        const query = "SELECT * FROM usuarios WHERE name = $1";
        const user = await this.registerDB.query(query, [name]);
        return user[0]
    }
}