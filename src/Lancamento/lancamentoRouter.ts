import express, {Request, Response} from "express";
import LancamentoController from "./lancamentoController";
import TokenUser from "../config/Token";

export default class LancamentoRouter
{
    public routes = express.Router();

    constructor(private lancamentoController: LancamentoController, private token: TokenUser)
    {
        this.routes.get("/", (req: Request, res: Response) => res.status(200).send("Documentos da Api Lancamento"));
        this.routes.get("/lancamento", this.token.authToken, (req: Request, res: Response) =>  {this.lancamentoController.getLancamento(req, res)});
        this.routes.post("/lancamento", this.token.authToken, (req: Request, res: Response) => {this.lancamentoController.newLancamento(req, res)});
        this.routes.get("/lancamento/excel", this.token.authToken, (req: Request, res: Response) => {this.lancamentoController.excelLancamento(req, res)});
        this.routes.delete("/lancamento", this.token.authToken, (req: Request, res: Response) => {this.lancamentoController.deleteLancamento(req, res)});
    }
}
