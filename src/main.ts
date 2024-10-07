import express, { Express } from "express";
import "dotenv/config";
import RegisterDB from "./config/dbConnect";
import UserModules from "./User/userModules";
import TokenUser from "./config/Token";
import LancamentoModules from "./Lancamento/lancamentoModules";
import AtivoModules from "./Ativo/ativoModule";

const app: Express =  express();

const registerDB = new RegisterDB();
const token = new TokenUser();

const userModules = new UserModules(app, registerDB, token);
const lancamentoModules = new LancamentoModules(app, registerDB, token);
const ativoModules = new AtivoModules(app, registerDB, token);

app.listen(process.env.PORTA, () =>
{
    console.log(`Servidor aberto na porta ${process.env.PORTA}`)
})
