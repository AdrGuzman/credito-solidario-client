import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importaciones de las rutas de usuarios
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AuthGuard } from '../auth/_guards/auth.guard';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ContraseniaUsuarioComponent } from './contrasenia-usuario/contrasenia-usuario.component';

const routes: Routes = [
  {path: 'usuarios', children: [
    {path: '', component: ListaUsuariosComponent},
    {path: ':id', component: RegistroUsuarioComponent},
    {path: ':id', component: ContraseniaUsuarioComponent}
  ], canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
