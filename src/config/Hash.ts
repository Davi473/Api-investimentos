import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export default class HashUser
{
  public criarHash(senha: string)
  {
    const sal = randomBytes(16).toString("hex");
    const senhaHash = scryptSync(senha, sal, 64).toString("hex");
    return `${sal}:${senhaHash}`
  }

  public autentica(senha: string, hashBanco: string)
  {
    const [sal, hash] = hashBanco.split(":")
    const testeHash = scryptSync(senha, sal, 64);
    const hashReal = Buffer.from(hash, "hex");
    return timingSafeEqual(testeHash, hashReal);
  }
}