import jwt from "jsonwebtoken";
import { NextFunction, Request, Response} from "express";
import "dotenv/config"

export default class TokenUser
{
  constructor() {}
  
  public criarToken(idUser: number, user: string)
  {
    if(!process.env.CHAVE_SECRETA)
    {
      throw new Error("Sem chave secreta no token");
    }
    const chaveSecreta = process.env.CHAVE_SECRETA;

    const userData = {
      id: idUser,
      name: user
    }
    const token = jwt.sign(
      userData, chaveSecreta, { expiresIn: '15d' }
    );

    return token
  }

  private descodificarToken(token: any): any | boolean
  {
    try
    {
      if(!process.env.CHAVE_SECRETA)
      {
        throw new Error("Sem chave secreta no token");
      }
      const chaveSecreta = process.env.CHAVE_SECRETA;

      const tokenNew = token.replace("Bearer ", "");
      const tokenDescodificado = jwt.verify(tokenNew, chaveSecreta)
      console.log(tokenDescodificado);
      return tokenDescodificado;
    }
    catch (error)
    {
      return false
    }
  }

  public authToken = (req: Request, res: Response, next: NextFunction) =>
  {
    const authHeader = req.headers["authorization"];
    const token = this.descodificarToken(authHeader);

    if(token)
    {
      (req as Request & { user: { name: string; id: string } }).user = {
        name: token.name,
        id: token.id,
      };
      next();
    }
    else
    {
      res.status(401).send({ message: "Not Auth" });
    }
  }
}