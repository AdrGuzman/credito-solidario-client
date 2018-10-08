import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';

import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';
import { ContraseniaUsuarioComponent } from '../contrasenia-usuario/contrasenia-usuario.component';
import { UsuarioService } from '../_services/usuario.service';
import { AuthService } from '../../auth/_services/auth.service';
import { Usuario } from '../../../shared/modelos/usuario';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  estaCargando: Boolean = false;
  usuarios: Usuario[];
  dataSource: MatTableDataSource<Usuario>;


  constructor(
    private usuariosServicio: UsuarioService,
    private authServicio: AuthService,
    public dialogo: MatDialog) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'usuario', 'nombre', 'correo', 'acciones'];

  aplicarFiltro(valorBusqueda: string) {
    this.dataSource.filter = valorBusqueda.trim().toLowerCase();
  }

  ngOnInit() {
    
    this.dataSource = new MatTableDataSource();
    this.obtenerListaUsuarios();
  }

  /*private obtenerAutorizaciones() {
    this.authServicio.obtenerAutorizaciones(1, 'Usuarios').subscribe();
  }*/

  obtenerListaUsuarios(): void {
    this.estaCargando = true;
    this.usuariosServicio.obtenerUsuarios().subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
    );
  }

  abrirDialogoNuevo(): void {
    const referenciaDialogo = this.dialogo.open(RegistroUsuarioComponent, {
      width: '550px',
      data: 0
    });

    referenciaDialogo.afterClosed().subscribe(
      result => {
        this.obtenerListaUsuarios();
      }
    );
  }

  abrirDialogoEditar(usuarioId: number): void {
    const referenciaDialogo = this.dialogo.open(RegistroUsuarioComponent, {
      width: '550px',
      data: usuarioId
    });

    referenciaDialogo.afterClosed().subscribe(
      result => {
        this.obtenerListaUsuarios();
      }
    );
  }

  abrirDialogoContrasenia(usuarioId: number): void {
    const referenciaDialogo = this.dialogo.open(ContraseniaUsuarioComponent, {
      width: '550px',
      data: usuarioId
    });
  }

  protected handleResponse(response: Usuario[]) {
    this.estaCargando = false;
    this.usuarios = response;
    this.dataSource.data = this.usuarios;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Usuario, busqueda: string) => (
      data.usuario.indexOf(busqueda) !== -1 ||
      data.nombre.indexOf(busqueda) !== -1 ||
      data.correo.indexOf(busqueda) !== -1
    );
  }

  protected handleError(error: any) {
    this.estaCargando = false;
    console.error(error);
  }
}
