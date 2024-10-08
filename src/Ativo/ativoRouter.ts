import express, {Request, Response} from "express";
import AtivoController from "./ativoController";

export default class UserRouter
{
    public routes = express.Router();

    constructor(private ativoController: AtivoController)
    {  
        this.routes.post("/ativo", async (req: Request, res: Response) => {this.ativoController.newAtivo(req.body, res)});
        this.routes.get("/ativo", async (req: Request, res: Response) => {this.ativoController.getAtivos(res)});
        this.routes.put("/ativo/:id", async (req: Request, res: Response) => {this.ativoController.ativoAtualizado(req.body, res)});
    }
}
