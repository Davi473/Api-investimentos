import UserService from "./userService";
import express from "express"


export default class UserController
{
    constructor(private userService: UserService) {}

    public userLogin = async (user: {name: string, senha: string}, res: express.Response) =>
    {
        try {
            const token = await this.userService.userLogin(user);
            if(token)
            {
                res.status(201).json({ message: "Entrada Autorizada", token: token});
            } else {
                res.status(301).json({ message: "Senha ou nome de usuaio não esta autorizado" });
            }
        } catch (err: any) {
            res.status(500).json({ message: `${err.message} - Erro no login`});
        }
    }

    public userSystem = async (res: express.Response) =>
    {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (err: any) {
            res.status(500).json({ message: `${err.message} - falha na requisição`});
        }
    }

    public userRegister = async (user: {name: string, senha: string}, res: express.Response) =>
    {
        try {
            const userDados = await this.userService.userRegister(user);
            if(userDados) {
                res.status(201).json({ message: "Adicionado" });
            } else {
                res.status(301).json({ message: "Nome de usuario ja existe" })
            }
        } catch (err: any) {
            res.status(500).json({ message: `${err.message} - falha ao tentar adicionar`})
        }
    }
}