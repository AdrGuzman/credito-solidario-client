import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';
import { Usuario } from '../../../shared/modelos/usuario';
import { Sistema } from '../../../shared/modelos/sistema';
import { Rol } from '../../../shared/modelos/rol';
import { Modulo } from '../../../shared/modelos/modulo';
import { RolesUsuarios } from '../../../shared/modelos/roles-usuarios';
import { HashMap } from '../../../shared/modelos/hash-map';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface Permiso {
  nombre?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public usuarioActual: Usuario;
  public sistemas: Sistema[];
  public modulos: Modulo[];
  public roles: Rol[];
  public rolUsuario: RolesUsuarios;
  public autorizaciones: Permiso[];

  private readonly apiUrl = environment.apiUrl;
  private loginUrl = this.apiUrl + '/login';
  private logoutUrl = this.apiUrl + '/logout';
  private meUrl = this.apiUrl + '/me';
  private rolesUrl = this.apiUrl + '/auth';
  private contraseniaUrl = this.apiUrl + '/password';
  private sistemasUrl = this.apiUrl + '/sistemas';

  constructor(private http: HttpClient, private router: Router) { }

  onLogin(usuario: Usuario): Observable<Usuario> {
    const request = JSON.stringify({
      usuario: usuario.usuario,
      contrasenia: usuario.contrasenia
    });

    return this.http.post(this.loginUrl, request, httpOptions).pipe(
      map((response: Usuario) => {
        const token: string = response['token_acceso'];

        if (token) {
          this.setToken(token);
          this.obtenerUsuario().subscribe();
          //this.obtenerRoles(this.usuarioActual.id).subscribe();
          //this.roles = response['roles'];
        }

        return response;
      }),
      catchError(error => this.handleError(error))
    );
  }

  onLogout(): Observable<any> {
    return this.http.post(this.logoutUrl, httpOptions).pipe(
      tap(
        () => {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      )
    );
  }

  setToken(token: string): void {
    return localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  obtenerUsuario(): Observable<Usuario> {
    return this.http.get(this.meUrl).pipe(
      tap(
        (usuario: Usuario) => {
          this.usuarioActual = usuario;
          console.log('usuario firme',this.usuarioActual);
        }
      )
    );
  }

  estaAutenticado(): boolean {
    const token: string = this.getToken();
    if (token) {
      return true;
    }

    return false;
  }

  obtenerSistemas(usuario: number): Observable<Sistema[]> {
    return this.http.get(this.apiUrl + '/auth/' + usuario + '/sistemas').pipe(
      tap(
        (sistemas: Sistema[]) => {
          this.sistemas = sistemas;
        }
      )
    );
  }

  obtenerModulos(usuario: number, sistema?: number): Observable<Modulo[]> {
    if (!sistema) {
      return this.http.get(this.apiUrl + '/auth/' + usuario + '/modulos').pipe(
        tap(
          (modulos: Modulo[]) => {
            this.modulos = modulos;
          }
        )
      );
    }
    
    return this.http.get(this.apiUrl + '/auth/' + usuario + '/' + sistema + '/modulos').pipe(
      tap(
        (modulos: Modulo[]) => {
          this.modulos = modulos;
        }
      )
    );
  }

  obtenerRoles(usuario: number): Observable<Rol[]> {
    return this.http.get(this.rolesUrl + '/' + usuario + '/roles').pipe(
      tap(
        (roles: Rol[]) => {
          this.roles = roles;
        }
      )
    );
  }

  obtenerRol(usuario: number, rol: number): Observable<RolesUsuarios> {
    return this.http.get(this.apiUrl + '/auth/' + usuario + '/' + rol + '/roles').pipe(
      tap(
        (rol: RolesUsuarios) => {
          this.rolUsuario = rol;
        }
      )
    );
  }

  cambiarContrasenia(usuario: number, contrasenia: string): Observable<any> {
    const request = JSON.stringify({
      usuarioid: usuario,
      contrasenia: contrasenia
    });
    return this.http.post(this.contraseniaUrl, request, httpOptions);
  }

  guardarRol(roles: RolesUsuarios[]): Observable<any> {
    const rol = JSON.stringify(roles);
    return this.http.post(this.apiUrl + '/auth/roles', rol, httpOptions);
  }

  actualizarRol(rol: RolesUsuarios): Observable<any> {
    rol.actualizadoPor = this.usuarioActual.id;
    const rolUsuario = JSON.stringify(rol);
    return this.http.put(this.apiUrl + '/auth/roles', rolUsuario, httpOptions);
  }

  obtenerAutorizaciones(usuario: number, modulo: string) {
    let usuarioAuth = usuario;
    /*if (!usuarioAuth) {
            if (this.usuarioActual) {
        
        usuarioAuth = this.usuarioActual.id;
      }
    }*/
    
    return this.http.get(this.apiUrl + '/auth/autorizaciones/' + modulo + '/' + usuarioAuth).pipe(
      tap(
        (autorizaciones: Permiso[]) => {
          this.autorizaciones = autorizaciones;
          console.log('Autorizaciones', this.autorizaciones);
          console.log('autorizaciones', autorizaciones);
        }
      )
    );
  }

  tieneAutorizacion(autorizacion: string) {
    if (this.autorizaciones && this.autorizaciones.find(permiso => {
      return permiso.nombre === autorizacion
    })) {
      return true;
    }
    return false;
  }

  tieneModulo(modulo: string) {
    if (this.modulos && this.modulos.find(modulo => {
      return modulo.nombre === modulo
    })) {
      return true;
    }

    return false;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Ocurrió un error: ', error.error.message);
    } else {
      return throwError(error);
    }

    return throwError('Ohps something wrong happen here; please try again later.');
  }
}
