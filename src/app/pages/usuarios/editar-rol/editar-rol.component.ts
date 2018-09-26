import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RolesUsuarios } from '../../../shared/modelos/roles-usuarios';
import { AuthService } from '../../auth/_services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RolService } from '../../roles/_services/rol.service';
import { Rol } from '../../../shared/modelos/rol';
import { UsuarioService } from '../_services/usuario.service';

@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.scss']
})
export class EditarRolComponent implements OnInit {
  formularioRol: FormGroup;
  rolUsuario: RolesUsuarios = new RolesUsuarios();
  rol: Rol = new Rol();
  estaCargando: boolean = false;
  estaCargandoRol: boolean = false;

  constructor(
    private authServicio: AuthService,
    private rolServicio: RolService,
    private fb: FormBuilder,
    private router: Router,
    public refDialogo: MatDialogRef<EditarRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RolesUsuarios) {
      this.crearFormulario();
  }

  ngOnInit() {
    this.obtenerRolUsuario();
    this.obtenerRol();
  }

  crearFormulario() {
    this.formularioRol = this.fb.group({
      nombre: [{value: '', disabled: true}, this.rol.nombre],
      fechaExpiracion: [this.rolUsuario.fechaExpiracion, Validators.compose([Validators.required])],
      estado: [this.rolUsuario.estado]
    });
  }

  obtenerRolUsuario(): void {
    this.estaCargando = true;
    const rolId = this.data.rolId;
    const usuarioId = this.data.usuarioId;
    this.authServicio.obtenerRol(usuarioId, rolId).subscribe(usuarioRol => {
      this.estaCargando = false;
      this.rolUsuario = usuarioRol;
      console.log(this.rolUsuario);
      this.formularioRol.patchValue({
        fechaExpiracion: this.rolUsuario.fechaExpiracion,
        estado: this.rolUsuario.estado
      });
    });
  }

  obtenerRol(): void {
    this.estaCargandoRol = true;
    const rolId = this.data.rolId;
    this.rolServicio.obtenerRol(rolId).subscribe(rol => {
      this.estaCargandoRol = false;
      this.rol = rol['data'];
      this.formularioRol.patchValue({
        nombre: this.rol.nombre
      });
    });
  }

  onSubmit(): void {
    this.estaCargando = true;
    const rolUsuario: RolesUsuarios = new RolesUsuarios();
    rolUsuario.rolId = this.data.rolId;
    rolUsuario.usuarioId = this.data.usuarioId;
    rolUsuario.fechaExpiracion = this.formularioRol.get('fechaExpiracion').value;
    rolUsuario.estado = this.formularioRol.get('estado').value;
    this.authServicio.actualizarRol(rolUsuario).subscribe(response => {
      this.estaCargando = false;
      this.refDialogo.close();
    });
  }
}
