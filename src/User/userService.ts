import HashUser from "../config/Hash";
import TokenUser from "../config/Token";
import UserModel from "./UserModel";

export default class UserService
{
    constructor(
        private userModel: UserModel, 
        private hash: HashUser,
        private token: TokenUser
    ) {}

    public async getUsers(): Promise<Object>
    {
        const users = await this.userModel.getUsers();
        if(!!users)
        {
            return { message: "Todos os usuarios do sistema", user: users};
        }
        return { message: "Nem um usuario encontrado" };
    }

    public async userRegister(user: {name: string, senha: string}): Promise<boolean>
    {
        const userExists = await this.userModel.getUserExistent(user.name);
        if(!userExists)
        {
            const data = (await this.data()).toLocaleDateString();
            const hash = await this.hash.criarHash(user.senha);
            const add = {name: user.name, hash: hash, createdat: data};
            await this.userModel.userRegister(add);
            return true;
        }
        return false
    }

    public async userLogin(user: {name: string, senha: string}): Promise<string | boolean>
    {
        const userExists = await this.userModel.getUser(user.name);
        if(userExists)
        {
            const hashTrue = await this.hash.autentica(user.senha, userExists.hash);
            if(hashTrue)
            {
                const token = await this.token.criarToken(userExists.id, userExists.name);
                return token;
            }
        }
        return false;
    }

    public async data(date: Date | null = null): Promise<Date>
    {
        let data = null;
        if(date)
        {
            data = new Date(date);
        } 
        else
        {
            data = new Date();
        }
        return data;
    }

}