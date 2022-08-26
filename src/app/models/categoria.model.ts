import { environment } from "src/environments/environment";

const base_url = environment.baseUrl;

export class Categoria{
  constructor(
    public id: number,
    public category_name: string,
    public updated_at: Date,
    public created_at: Date,

  ){
  }

}
