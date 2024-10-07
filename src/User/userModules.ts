import RegisterDB from "../config/dbConnect";
import UserController from "./userController";
import UserModel from "./UserModel";
import UserRouter from "./userRouter";
import UserService from "./userService";
import express, { Express } from "express";
import HashUser from "../config/Hash";
import TokenUser from "../config/Token";

export default class UserModules 
{
    private userController: UserController;
    private userModel: UserModel;
    private userService: UserService;
    private userRouter: UserRouter;
    private HashUser: HashUser;

    constructor(private app: Express, private registerDB: RegisterDB, private token: TokenUser)
    {
        this.HashUser = new HashUser();
        this.userModel = new UserModel(this.registerDB);
        this.userService = new UserService(this.userModel, this.HashUser, this.token);
        this.userController = new UserController(this.userService);
        this.userRouter = new UserRouter(this.userController);
        this.app.use(express.json(), this.userRouter.routes);
    }

    public getUserModel(): UserModel
    {
        return this.userModel;
    }
}