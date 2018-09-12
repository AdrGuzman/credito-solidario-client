import { Usuario } from './usuario';
import { Rol } from './rol';

export class RolesUsuarios {
    usuarioId: number;
    rolId: number;
    estado: number;
    fechaExpiracion?: string;

    usuario: Usuario;
    rol: Rol;
}
