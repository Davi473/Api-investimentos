import { stringify } from "querystring";
import AtivoService from "./ativoService";
import express from "express"


export default class AtivoController
{
    constructor(private ativoService: AtivoService) {}

    public newAtivo = async (ativo: {ticket: string, tipo: string}, res: express.Response) =>
    {
        try {
            console.log(ativo);
            const ativoNew = await this.ativoService.newAtivo(ativo);
            if(ativoNew == stringify)
            {
                res.status(201).json({ message: "Ativo adicionado", ativo: ativoNew});
            }
            res.status(201).json({ message: ativoNew});
        } catch (err: any) {
            res.status(500).json({ message: `${err.message} - Erro em adiciconar o novo ativo`});
        }
    }

    public getAtivos = async (res: express.Response) =>
    {
        try {
            const ativos = await this.ativoService.getAtivos();
            res.status(200).json({ message: "Ativos atuais", ativos: ativos});
        } catch (err: any) {
            res.status(500).json({ message: `${err.message} - falha na requisição dos ativos`});
        }
    }
    
    public ativoAtualizado = async (ativo: {ticket: string, tipo: string, id: number}, res: express.Response) =>
    {
        try {
            const ativoAtualizado = await this.ativoService.ativoAtualizado(ativo);
            res.status(201).json({ message: "Ativo atulizado", ativo: ativoAtualizado });
        } catch (err: any) {
            res.status(500).json({ message: `${err.message} - falha na atualização do ativo`});
        }
    }
}