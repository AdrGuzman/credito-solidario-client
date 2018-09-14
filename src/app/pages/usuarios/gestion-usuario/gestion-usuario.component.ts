import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UsuarioService } from '../../usuarios/_services/usuario.service';
import { RolesUsuarios } from '../../../shared/modelos/roles-usuarios';
import { AuthService } from '../../auth/_services/auth.service';
import { Usuario } from '../../../shared/modelos/usuario';
import { Rol } from '../../../shared/modelos/rol';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css']
})
export class GestionUsuarioComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  usuario: Usuario = new Usuario();
  estaCargando: Boolean = false;
  roles: Rol[];
  dataSource: MatTableDataSource<Rol>;
  displayColumns = ['id', 'nombre', 'acciones'];
  formularioUsuario: FormGroup;

  constructor(
    private authServicio: AuthService,
    private router: ActivatedRoute,
    private usuarioServicio: UsuarioService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
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
    this.authServicio.obtenerRoles(usuarioId).subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
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
    console.error(error);
  }
}
