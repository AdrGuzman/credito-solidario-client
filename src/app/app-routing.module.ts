import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaUsuariosComponent } from './pages/usuarios/lista-usuarios/lista-usuarios.component';
import { GestionUsuarioComponent } from './pages/usuarios/gestion-usuario/gestion-usuario.component';
import { RegistroUsuarioComponent } from './pages/usuarios/registro-usuario/registro-usuario.component';
import { ContraseniaUsuarioComponent } from './pages/usuarios/contrasenia-usuario/contrasenia-usuario.component';
import { ListaRolesComponent } from './pages/usuarios/lista-roles/lista-roles.component';
import { EditarRolComponent } from './pages/usuarios/editar-rol/editar-rol.component';
import { AuthGuard } from './pages/auth/_guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  /*{
    path: '',
    component: HomeComponent
  },
  {
    path: 'usuarios',
    data: {
      breadcrumb: 'Usuarios'
    },
    children: [
      {
        path: '',
        component: ListaUsuariosComponent
      },
      {
        path: ':id',
        component: GestionUsuarioComponent
      },
      {
        path: ':id/registro',
        component: RegistroUsuarioComponent
      },
      {
        path: ':id/contrasenia',
        component: ContraseniaUsuarioComponent
      },
      {
        path: ':id/roles',
        component: ListaRolesComponent
      },
      {
        path: ':id/rol',
        component: EditarRolComponent
      }
    ], canActivate: [AuthGuard]
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
