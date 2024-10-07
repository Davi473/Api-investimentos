import express, {Request, Response} from "express";
import UserController from "./userController";
import TokenUser from "../config/Token";

export default class UserRouter
{
    public routes = express.Router();

    constructor(private userController: UserController)
    {  
        this.routes.post("/login", async (req: Request, res: Response) => {this.userController.userLogin(req.body, res)});
        this.routes.post("/register", async (req: Request, res: Response) => {this.userController.userRegister(req.body, res)});
    }
}
