import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

// Importaciones de la aplicación
import { environment } from './../../../../environments/environment';
import { Usuario } from './../../../shared/modelos/usuario';
import { HttpErrorHandler, HandleError } from '../../../shared/_services/http-handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiUrl = environment.apiUrl;
  private usuariosUrl = this.apiUrl + '/usuarios';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('Servicio de usuarios');
  }

  obtenerUsuarios () : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl).pipe(
      catchError(this.handleError('obtenerUsuarios', []))
    );
  }

  obtenerUsuario (id: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl + `/${id}`).pipe(
      catchError(this.handleError('obtenerUsuario', []))
    );
  }

  agregarUsuario (usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.usuariosUrl, usuario).pipe(
      catchError(this.handleError('agregarUsuario', usuario))
    );
  }

  actualizarUsuario(usuario: Usuario, id: number): Observable<Usuario> {
    return this.http.put<Usuario>(this.usuariosUrl + `/${id}`, usuario).pipe(
      catchError(this.handleError('actualizarUsuario', usuario))
    );
  }

  eliminarUsuario(id: number): Observable<Usuario[]> {
    return this.http.delete<Usuario[]>(this.usuariosUrl + `/${id}`).pipe(
      catchError(this.handleError('eliminarUsuario', []))
    );
  }
}
