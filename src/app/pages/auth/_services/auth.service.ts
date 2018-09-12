import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';
import { Usuario } from '../../../shared/modelos/usuario';
import { Sistema } from '../../../shared/modelos/sistema';
import { Rol } from '../../../shared/modelos/rol';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuarioActual: Usuario;
  public roles: Rol[];
  private readonly apiUrl = environment.apiUrl;
  private loginUrl = this.apiUrl + '/login';
  private logoutUrl = this.apiUrl + '/logout';
  private meUrl = this.apiUrl + '/me';
  private rolesUrl = this.apiUrl + '/auth';
  private contraseniaUrl = this.apiUrl + '/password';

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
          //this.obtenerUsuario().subscribe();
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

  //obtenerSistemas(usuario: number): Observable<Sistema>

  obtenerRoles(usuario: number): Observable<Rol[]> {
    return this.http.get(this.rolesUrl + '/' + usuario + '/roles').pipe(
      tap(
        (roles: Rol[]) => {
          this.roles = roles;
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Ocurrió un error: ', error.error.message);
    } else {
      return throwError(error);
    }

    return throwError('Ohps something wrong happen here; please try again later.');
  }
}
