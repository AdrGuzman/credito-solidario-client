import { Usuario } from './usuario';
import { Rol } from './rol';
import { Entidad } from './entidad';

export class RolesUsuarios extends Entidad {
    usuarioId: number;
    rolId: number;
    estado: number;
    fechaExpiracion?: string;

    usuario: Usuario;
    rol: Rol;
}
