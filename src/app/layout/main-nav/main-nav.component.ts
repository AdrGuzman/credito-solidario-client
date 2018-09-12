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

  public constructor(private titleTagService: Title, public auth: AuthService, private router: Router) {}

  public setTitle(pageTitle: string) {
    this.titleTagService.setTitle(pageTitle);
  }

  ngOnInit() {
    if (this.auth.estaAutenticado()) {
      const myObserver = {
        next: x => this.onObtenerRoles(x.id)
      };
      this.auth.obtenerUsuario().subscribe(myObserver);
      //this.auth.obtenerRoles(this.auth.usuarioActual.id).subscribe();
    }
  }

  onObtenerRoles(id: number) {
    this.auth.obtenerRoles(id).subscribe()
  }

  onLogout() {
    this.auth.onLogout().subscribe();
  }
}
