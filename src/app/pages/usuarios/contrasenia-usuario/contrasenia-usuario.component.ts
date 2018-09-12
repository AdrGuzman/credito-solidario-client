import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ValidacionContrasenia } from '../../../shared/validaciones/validacion-contrasenia';
import { UsuarioService } from '../_services/usuario.service';
import { AuthService } from '../../auth/_services/auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-contrasenia-usuario',
  templateUrl: './contrasenia-usuario.component.html',
  styleUrls: ['./contrasenia-usuario.component.scss']
})
export class ContraseniaUsuarioComponent implements OnInit {
  formularioContrasenia: FormGroup;
  usuario: Usuario = new Usuario();
  contrasenia: string;
  confirmarContrasenia: string;
  estaCargando: boolean = false;

  constructor(
    private usuarioServicio: UsuarioService,
    private authServicio: AuthService,
    private fb: FormBuilder,
    public refDialogo: MatDialogRef<ContraseniaUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.crearFormulario();
  }

  ngOnInit() {
    this.obtenerUsuario();
  }

  crearFormulario() {
    this.formularioContrasenia = this.fb.group({
      nombre: [this.usuario.nombre, Validators.compose([Validators.required])],
      contrasenia: [this.contrasenia, Validators.compose([Validators.required])],
      confirmarContrasenia: [this.confirmarContrasenia, Validators.compose([Validators.required])]
    },
    {
      validator: ValidacionContrasenia.ContraseniaCoincide
    });
  }

  obtenerUsuario(): void {
    this.estaCargando = true;
    const usuarioId = this.data;
    if (usuarioId >= 1) {
      this.usuarioServicio.obtenerUsuario(usuarioId).subscribe(usuario => {
        this.estaCargando = false;
        this.usuario = usuario['data'];
        this.formularioContrasenia.patchValue({
          nombre: this.usuario.nombre
        });
      });
    }
  }

  onNoClick(): void {
    this.refDialogo.close();
  }

  onSubmit(): void {
    this.estaCargando = true;
    const usuarioId = this.data;
    this.authServicio.cambiarContrasenia(usuarioId, this.contrasenia).subscribe(algo => {
      this.refDialogo.close();
    });
  }

}
