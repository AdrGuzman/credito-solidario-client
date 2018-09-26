import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Rol } from '../../../shared/modelos/rol';
import { AuthService } from '../../auth/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../_services/usuario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../../../shared/modelos/usuario';
import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';
import { ContraseniaUsuarioComponent } from '../contrasenia-usuario/contrasenia-usuario.component';
import { ListaRolesComponent } from '../lista-roles/lista-roles.component';
import { EditarRolComponent } from '../editar-rol/editar-rol.component';

@Component({
  selector: 'app-/pages/usuarios/gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css']
})
export class GestionUsuarioComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Rol>;
  estaCargando: boolean = false;
  roles: Rol[];
  usuario: Usuario = new Usuario();
  formularioUsuario: FormGroup;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'fechaExpiracion', 'acciones'];

  constructor(
    private authServicio: AuthService,
    private usuarioServicio: UsuarioService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    public dialogo: MatDialog
  ) {
    this.crearFormulario();
  }

  ngOnInit() {
    this.obtenerUsuario();
    this.dataSource = new MatTableDataSource();
    this.obtenerRolesUsuario();
  }

  crearFormulario() {
    this.formularioUsuario = this.fb.group({
      usuario: [{value: '', disabled: true}, this.usuario.usuario],
      nombre: [{value: '', disabled: true}, this.usuario.nombre],
      correo: [{value: '', disabled: true}, this.usuario.correo]
    });
  }

  obtenerUsuario(): void {
    this.estaCargando = true;
    const usuarioId = +this.router.snapshot.paramMap.get('id');
    if (usuarioId) {
      this.usuarioServicio.obtenerUsuario(usuarioId).subscribe(
        usuario => {
          this.estaCargando = false;
          this.usuario = usuario['data'];
          this.formularioUsuario.patchValue({
            usuario: this.usuario.usuario,
            nombre: this.usuario.nombre,
            correo: this.usuario.correo
          });
        });
    }
  }

  obtenerRolesUsuario(): void {
    this.estaCargando = true;
    const usuarioId = +this.router.snapshot.paramMap.get('id');
    if (usuarioId) {
      this.authServicio.obtenerRoles(usuarioId).subscribe(
        response => this.handleResponse(response),
        error => this.handleError(error)
      );
    }
  }

  abrirDialogoEditar(): void {
    const usuarioId = +this.router.snapshot.paramMap.get('id');
    const referenciaDialogo = this.dialogo.open(RegistroUsuarioComponent, {
      width: '550px',
      data: usuarioId
    });

    referenciaDialogo.afterClosed().subscribe(
      result => {
        this.obtenerUsuario();
      }
    );
  }

  abrirDialogoContrasenia(): void {
    const usuarioId = +this.router.snapshot.paramMap.get('id');
    const referenciaDialogo = this.dialogo.open(ContraseniaUsuarioComponent, {
      width: '550px',
      data: usuarioId
    });
  }

  abrirDialogoRoles(): void {
    const usuarioId = +this.router.snapshot.paramMap.get('id');
    const referenciaDialogo = this.dialogo.open(ListaRolesComponent, {
      width: '550px',
      data: usuarioId
    });

    referenciaDialogo.afterClosed().subscribe(
      result => {
        this.obtenerRolesUsuario();
      }
    );
  }

  abrirDialogoEditarRol(rol: number): void {
    const usuarioId = +this.router.snapshot.paramMap.get('id');
    const rolId = rol;
    const referenciaDialogo = this.dialogo.open(EditarRolComponent, {
      width: '550px',
      data: {rolId: rolId, usuarioId: usuarioId}
    });

    referenciaDialogo.afterClosed().subscribe(
      result => {
        this.obtenerRolesUsuario();
      }
    );
  }

  protected handleResponse(response: Rol[]) {
    this.estaCargando = false;
    this.roles = response;
    this.dataSource.data = this.roles;
    this.dataSource.sort = this.sort;
  }

  protected handleError(error: any) {
    this.estaCargando = false;
    console.log(error);
  }
}
