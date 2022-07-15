import { Moment } from "moment";

export interface IUsuario {
  idCadUsuario?: number; 
	dcrUsuario?: string;
	dcrLogin?: string;
	dcrSenha?: string;
	datCadastro?: Moment;
	datDesativacao?: Moment;
}

export class Usuario implements IUsuario {
    constructor(
      public idCadUsuario?: number,
      public dcrUsuario?: string,
      public dcrLogin?: string,
      public dcrSenha?: string,
      public datCadastro?: Moment,
      public datDesativacao?: Moment
    ) {}
}
