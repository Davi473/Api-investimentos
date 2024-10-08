import express, {Request, Response} from "express";
import CarteiraController from "./carteiraController";
import TokenUser from "../config/Token";

export default class CarteiraRouter
{
    public routes = express.Router();

    constructor(private carteiraController: CarteiraController, private token: TokenUser)
    {
        this.routes.get("/", (req: Request, res: Response) => res.status(200).send("Documentos da Api Lancamento"));
        this.routes.get("/carteira", this.token.authToken, (req: Request, res: Response) =>  {this.carteiraController.getCarteira(req, res)});
        //this.routes.get("/carteira/excel", this.token.authToken, (req: Request, res: Response) => {this.carteiraController.excelCarteira(req, res)});
    }
}