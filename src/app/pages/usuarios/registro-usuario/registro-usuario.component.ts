import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Importaciones de la aplicación
import { UsuarioService } from '../_services/usuario.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent implements OnInit {
  formularioUsuario: FormGroup;
  usuario: Usuario = new Usuario();
  estaCargando: boolean = false;

  constructor(
    private usuarioServicio: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    public refDialogo: MatDialogRef<RegistroUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
      this.crearFormulario();
    }

  ngOnInit() {
    this.obtenerUsuario();
  }

  crearFormulario() {
    this.formularioUsuario = this.fb.group({
      usuario: [this.usuario.usuario, Validators.compose([Validators.required])],
      nombre: [this.usuario.nombre, Validators.compose([Validators.required])],
      correo: [this.usuario.correo, Validators.compose([Validators.required])]
    });
  }

  obtenerUsuario(): void {
    this.estaCargando = true;
    const usuarioId = this.data;
    if (usuarioId >= 1) {
      this.usuarioServicio.obtenerUsuario(usuarioId).subscribe(usuario => {
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

  onSubmit(): void {
    this.estaCargando = true;
    const usuarioId = this.data;
    if (usuarioId >= 1) {
      this.usuarioServicio.actualizarUsuario(this.formularioUsuario.value, usuarioId).subscribe(
        response => {
          this.estaCargando = false;
          this.usuario = response['data'];
          this.refDialogo.close();
          //this.router.navigate(['/usuarios']);
        }
      );
    } else {
      this.usuarioServicio.agregarUsuario(this.formularioUsuario.value).subscribe(
        response => {
          this.estaCargando = false;
          this.refDialogo.close();
        }
      );
    }
  }

  onNoClick(): void {
    this.refDialogo.close();
  }

}
