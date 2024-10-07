import RegisterDB from "../config/dbConnect";
import AtivoController from "./ativoController";
import AtivoModel from "./ativoModel";
import AtivoRouter from "./ativoRouter";
import AtivoService from "./ativoService";
import express, { Express } from "express";
import TokenUser from "../config/Token";

export default class AtivoModules 
{
    private ativoController: AtivoController;
    private ativoModel: AtivoModel;
    private ativoService: AtivoService;
    private ativoRouter: AtivoRouter;

    constructor(private app: Express, private registerDB: RegisterDB, private token: TokenUser)
    {
        this.ativoModel = new AtivoModel(this.registerDB);
        this.ativoService = new AtivoService(this.ativoModel);
        this.ativoController = new AtivoController(this.ativoService);
        this.ativoRouter = new AtivoRouter(this.ativoController, this.token);
        this.app.use(express.json(), this.ativoRouter.routes);
    }


    public getAtivoModel = () => 
    {
        return this.ativoModel;
    }
}