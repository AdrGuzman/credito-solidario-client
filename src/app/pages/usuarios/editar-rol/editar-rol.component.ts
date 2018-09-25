import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RolesUsuarios } from '../../../shared/modelos/roles-usuarios';
import { AuthService } from '../../auth/_services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.scss']
})
export class EditarRolComponent implements OnInit {
  formularioRol: FormGroup;
  rolUsuario: RolesUsuarios;
  estaCargando: boolean = false;

  constructor(
    private authServicio: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public refDialogo: MatDialogRef<EditarRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
      this.crearFormulario();
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.formularioRol = this.fb.group({
      nombre: [this.rolUsuario.rol.nombre],
      fechaExpiracion: [this.rolUsuario.fechaExpiracion, Validators.compose([Validators.required])],
      estado: [this.rolUsuario.estado]
    });
  }

  obtenerRol(): void {
    this.estaCargando = true;
    const rolId = this.data;
    if (rolId >= 1) {
      //this.authServicio.obt
    }
  }
}
