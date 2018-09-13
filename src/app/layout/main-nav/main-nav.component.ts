import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from  '@angular/router';
import { Title } from  '@angular/platform-browser';

// Importaciones de la aplicación
import { AuthService } from  '../../pages/auth/_services/auth.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  estaCargando: boolean = false;

  public constructor(private titleTagService: Title, public auth: AuthService, private router: Router) {}

  public setTitle(pageTitle: string) {
    this.titleTagService.setTitle(pageTitle);
  }

  ngOnInit() {
    if (this.auth.estaAutenticado()) {
      /*const myObserver = {
        next: x => this.onObtenerSistemas(x.id)
      };*/

      this.auth.obtenerUsuario().subscribe();
      //this.auth.obtenerRoles(this.auth.usuarioActual.id).subscribe();
    }
  }

  onObtenerSistemas(id: number) {
    this.estaCargando = true;
    const observer = {
      next: x => console.log(),
      complete: () => this.estaCargando = false
    }
    this.auth.obtenerSistemas(id).subscribe(observer);
  }

  /*onObtenerRoles(id: number) {
    this.auth.obtenerRoles(id).subscribe()
  }*/

  onLogout() {
    this.auth.onLogout().subscribe();
  }
}
