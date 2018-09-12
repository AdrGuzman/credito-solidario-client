import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importaciones de la aplicación
import { Usuario } from './../../usuarios/usuario';
import { AuthService } from './../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioInicio: FormGroup;
  error: any;
  usuario: Usuario = new Usuario();
  returnUrl: string;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    this.crearFormulario();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  crearFormulario() {
    this.formularioInicio = this.fb.group({
      usuario: [this.usuario.usuario, Validators.compose([Validators.required])],
      contrasenia: [this.usuario.contrasenia, Validators.compose([Validators.required])]
    });
  }

  onSubmit(): void {
    this.authService.onLogin(this.formularioInicio.value).subscribe(
      (response) => {
        this.router.navigate(['/usuarios'])
      },
      (response) => {
        if (response.status === 422) {
          Object.keys(response.error).map((err) => {
            this.error = `${response.error[err]}`;
          });
        } else {
          this.error = response.error;
        }
      }
    );
  }

}
