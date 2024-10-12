import axios from "axios";

export default class AtivoPreco
{
  private api_key: string;

  constructor()
  {
    if(process.env.API_KEY_PRECO_ATIVO)
    {
      this.api_key = process.env.API_KEY_PRECO_ATIVO;
    }
  }

  public async procurarAtivo(symbol: string)
  {
    try {
      const response = await axios.get("https://www.alphavantage.co/query", 
          {
            params: {
              function: "TIME_SERIES_DAILY",
              symbol: symbol,
              apikey: this.api_key
            }
          });

      const timeSeries = response.data["Time Series (Daily)"];

      if(!timeSeries)
      {
        
      }
    }
  }
}

