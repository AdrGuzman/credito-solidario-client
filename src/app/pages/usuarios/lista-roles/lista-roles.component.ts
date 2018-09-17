import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Rol } from '../../../shared/modelos/rol';
import { RolService } from '../../roles/_services/rol.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from '../../auth/_services/auth.service';
import { RolesUsuarios } from '../../../shared/modelos/roles-usuarios';

@Component({
  selector: 'app-/pages/usuarios/lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css']
})
export class ListaRolesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Rol>;
  selection = new SelectionModel<Rol>(true, []);
  roles: Rol[];
  rolesUsuarios: RolesUsuarios[];
  estaCargando: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'id', 'nombre'];

  constructor(
    private rolServicio: RolService,
    private authServicio: AuthService,
    public refDialogo: MatDialogRef<ListaRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.obtenerRoles();
  }

  protected aplicarFiltro(valorBusqueda: string) {
    this.dataSource.filter = valorBusqueda.trim().toLowerCase();
  }

  protected estaTodoSeleccionado() {
    const numSeleccionados = this.selection.selected.length;
    const numFilas = this.dataSource.data.length;
    return numSeleccionados === numFilas;
  }

  protected masterToggle() {
    this.estaTodoSeleccionado() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  protected onNoClick(): void {
    this.refDialogo.close();
  }

  protected guardarRoles(): void {
    //this.dataSource.data.forEach();
    console.log('seleccionados',this.selection.selected);
    const rolesSeleccionados = this.selection.selected;
    let contadorRoles = 0;
    rolesSeleccionados.forEach(function(rol) {
      const rolUsuario: RolesUsuarios = new RolesUsuarios();
      rolUsuario.usuarioId = rol.id;
      this.rolesUsuarios.push();
    });
    this.authServicio.guardarRoles(this.rolesUsuarios).subscribe();
  }

  protected obtenerRoles(): void {
    this.estaCargando = true;
    this.rolServicio.obtenerRoles().subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
    );
  }

  protected handleResponse(response: Rol[]) {
    this.estaCargando = false;
    this.roles = response;
    this.dataSource.data = this.roles;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Rol, busqueda: string) => (
      data.nombre.indexOf(busqueda) !== -1
    );
  }

  protected handleError(error: any) {
    console.log(error);
  }
}
