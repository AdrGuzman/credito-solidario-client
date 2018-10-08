import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { Modulo } from '../../../shared/modelos/modulo';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.estaAutenticado()) {
      return this.tienePermisosRequeridos(this.auth.usuarioActual.id, next.data['breadcrumb']);
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  }

  protected tienePermisosRequeridos(usuario: number, modulo: string): Observable<boolean> | Promise<boolean> | boolean {
    // Si los permisos del usuario ya han sido recuperados de la API
    if (this.auth.autorizaciones) {
      // Revisar si puede ingresar a la ruta,
      // esto es, si tiene el modulo dentro de sus permisos
      if (modulo) {
        return this.puedeAccederModulo(modulo);
      }
      
      return false;
    } else {
      // Recupera los permisos del usuario de la API
      const promise = new Promise<boolean>((resolve, reject) => {
        this.auth.obtenerAutorizaciones(usuario, modulo).toPromise().then(
          () => {
            // Revisar si puede ingresar a la ruta
            resolve(this.puedeAccederModulo(modulo));
          }
        ).catch(
          () => {
            resolve(false);
        });
      });

      return promise;
    }
  }

  protected puedeAccederModulo(modulo: string) : boolean {
    return this.auth.obtenerModulos(this.auth.usuarioActual.id).pipe(
      map(
        (modulos: Modulo[]) => {
          if (modulos && modulos.find(modulo => {
            return modulo.nombre === modulo
          })) {
            return true;
          }
          return false;
        }
      )
    );
  }
}
