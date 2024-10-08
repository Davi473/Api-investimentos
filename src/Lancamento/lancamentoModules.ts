import RegisterDB from "../config/dbConnect";
import express, { Express } from "express";
import LancamentoController from "./lancamentoController";
import LancamentoModel from "./lancamentoModel";
import LancamentoService from "./lancamentoService";
import LancamentoRouter from "./lancamentoRouter";
import TokenUser from "../config/Token";
import AtivoModel from "../Ativo/ativoModel";
import CarteiraModel from "../Carteira/carteiraModel";

export default class LancamentoModules 
{
    private lancamentoController: LancamentoController;
    private lancamentoModel: LancamentoModel;
    private lancamentoService: LancamentoService;
    private lancamentoRouter: LancamentoRouter;

    constructor(
        private app: Express, private registerDB: RegisterDB, private token: TokenUser, 
        private ativoModel: AtivoModel, private carteiraModel: CarteiraModel
    ) {
        this.lancamentoModel = new LancamentoModel(this.registerDB);
        this.lancamentoService = new LancamentoService(this.lancamentoModel, this.ativoModel, this.carteiraModel);
        this.lancamentoController = new LancamentoController(this.lancamentoService);
        this.lancamentoRouter = new LancamentoRouter(this.lancamentoController, this.token);
        this.app.use(express.json(), this.lancamentoRouter.routes);
    }
}