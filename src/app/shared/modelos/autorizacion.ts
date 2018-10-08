import { Entidad } from './entidad';

export class Autorizacion extends Entidad {
    rolId?: number;
    sistemaId?: number;
    moduloId?: number;
    opcionId?: number;
    estado?: number;
}
