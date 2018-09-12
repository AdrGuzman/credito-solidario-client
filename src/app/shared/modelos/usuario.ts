import { RolesUsuarios } from './roles-usuarios';

export class Usuario {
    id?: number;
    usuario?: string;
    nombre?: string;
    correo?: string;
    contrasenia?: string;
    fechaIngreso?: string;
    roles?: RolesUsuarios[];
}
