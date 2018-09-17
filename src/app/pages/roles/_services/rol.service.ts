import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Importaciones de la aplicación
import { environment } from '../../../../environments/environment';
import { Rol } from '../../../shared/modelos/rol';
import { HttpErrorHandler, HandleError } from '../../../shared/_services/http-handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private readonly apiUrl = environment.apiUrl;
  private rolesUrl = this.apiUrl + '/roles';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) { 
    this.handleError = httpErrorHandler.createHandleError('Servicio de roles');
  }

  obtenerRoles (): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.rolesUrl).pipe(
      catchError(this.handleError('obtenerRoles', []))
    );
  }

  obtenerRol (id: number): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.rolesUrl + `/${id}`).pipe(
      catchError(this.handleError('obtenerRol', []))
    );
  }

  agregarRol (rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.rolesUrl, rol).pipe(
      catchError(this.handleError('agregarRol', rol))
    );
  }

  actualizarRol (rol: Rol, id: number) {
    return this.http.put<Rol>(this.rolesUrl + `/${id}`, rol).pipe(
      catchError(this.handleError('actualizarRol', rol))
    );
  }

  eliminarRol (id: number) {
    return this.http.delete<Rol[]>(this.rolesUrl + `/${id}`).pipe(
      catchError(this.handleError('eliminarRol', []))
    );
  }
}
