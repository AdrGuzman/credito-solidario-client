import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importaciones de las rutas de usuarios
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AuthGuard } from '../auth/_guards/auth.guard';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ContraseniaUsuarioComponent } from './contrasenia-usuario/contrasenia-usuario.component';
import { GestionUsuarioComponent } from './gestion-usuario/gestion-usuario.component';
import { ListaRolesComponent } from './lista-roles/lista-roles.component';
import { EditarRolComponent } from './editar-rol/editar-rol.component';

const routes: Routes = [
  {
    path: 'usuarios',
    data: {
      breadcrumb: 'Usuarios'
    },
    children: [
      {path: '', component: ListaUsuariosComponent},
      {path: ':id', component: GestionUsuarioComponent},
      {path: ':id/registro', component: RegistroUsuarioComponent},
      {path: ':id/contrasenia', component: ContraseniaUsuarioComponent},
      {path: ':id/roles', component: ListaRolesComponent},
      {path: ':id/rol', component: EditarRolComponent}
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
