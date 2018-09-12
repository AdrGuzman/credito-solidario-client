import { RolesUsuarios } from './roles-usuarios';

export class Rol {
    id?: number;
    nombre?: string;
    descripcion?: string;
    estado?: number;
    rolesUsuario?: RolesUsuarios[];
}
