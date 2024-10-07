import express, {Request, Response} from "express";
import AtivoController from "./ativoController";
import TokenUser from "../config/Token";

export default class UserRouter
{
    public routes = express.Router();

    constructor(private ativoController: AtivoController, private token: TokenUser)
    {  
        this.routes.post("/ativo", token.authToken, async (req: Request, res: Response) => {this.ativoController.newAtivo(req.body, res)});
        this.routes.get("/ativo", token.authToken, async (req: Request, res: Response) => {this.ativoController.getAtivos(res)});
        this.routes.get("/ativo/:ticket", token.authToken, async (req: any, res: Response) => {this.ativoController.ativoTicket(req.query, res)}); //usar query
        this.routes.get("/ativo/:tipo", token.authToken, async (req: any, res: Response) => {this.ativoController.ativosTipo(req.query, res)}); //usar params
        this.routes.put("/ativo/:id", token.authToken, async (req: Request, res: Response) => {this.ativoController.ativoAtualizado(req.body, res)});
    }
}
