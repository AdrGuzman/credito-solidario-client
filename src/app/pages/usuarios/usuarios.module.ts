import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BusquedaUsuarioPipe } from './_pipes/busqueda-usuario.pipe';
import { ContraseniaUsuarioComponent } from './contrasenia-usuario/contrasenia-usuario.component';
import { GestionUsuarioComponent } from './gestion-usuario/gestion-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule
  ],
  declarations: [
    UsuariosComponent,
    ListaUsuariosComponent,
    BusquedaUsuarioPipe,
    RegistroUsuarioComponent,
    ContraseniaUsuarioComponent,
    GestionUsuarioComponent,]
})
export class UsuariosModule { }
