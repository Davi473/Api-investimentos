import RegisterDB from "../config/dbConnect";
import express, { Express } from "express";
import CarteiraController from "./carteiraController";
import CarteiraModel from "./carteiraModel";
import CarteiraService from "./carteiraService";
import CarteiraRouter from "./carteiraRouter";
import TokenUser from "../config/Token";

export default class CarteiraModules 
{
    private carteiraController: CarteiraController;
    private carteiraModel: CarteiraModel;
    private carteiraService: CarteiraService;
    private carteiraRouter: CarteiraRouter;

    constructor(
        private app: Express, private registerDB: RegisterDB, private token: TokenUser
    ) {
        this.carteiraModel = new CarteiraModel(this.registerDB);
        this.carteiraService = new CarteiraService(this.carteiraModel);
        this.carteiraController = new CarteiraController(this.carteiraService);
        this.carteiraRouter = new CarteiraRouter(this.carteiraController, this.token);
        this.app.use(express.json(), this.carteiraRouter.routes);
    }

    public getCarteiraModel(): CarteiraModel
    {
        return this.carteiraModel
    }
}