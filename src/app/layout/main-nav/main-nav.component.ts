import { Component } from '@angular/core';
import { Router, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from  '@angular/router';
import { Title } from  '@angular/platform-browser';

// Importaciones de la aplicación
import { AuthService } from  '../../pages/auth/_services/auth.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  estaCargandoSistemas: boolean = false;
  estaCargandoModulos: boolean = false;
  cargandoRuta: boolean = false;

  public constructor(private titleTagService: Title, public auth: AuthService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart:
          this.cargandoRuta = true;
          break;

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:
          this.cargandoRuta = false;
          break;
      
        default:
          break;
      }
    });
  }

  public setTitle(pageTitle: string) {
    this.titleTagService.setTitle(pageTitle);
  }

  ngOnInit() {
    if (this.auth.estaAutenticado()) {
      /*const myObserver = {
        next: x => this.onObtenerSistemas(x.id)
      };*/

      this.auth.obtenerUsuario().subscribe();
    }
  }

  onObtenerSistemas(id: number) {
    this.estaCargandoSistemas = true;
    const observer = {
      next: x => console.log(),
      complete: () => this.estaCargandoSistemas = false
    }
    this.auth.obtenerSistemas(id).subscribe(observer);
  }

  onObtenerModulos(usuario: number, sistema: number) {
    this.estaCargandoModulos = true;
    const observer = {
      next: x => console,
      complete: () => this.estaCargandoModulos = false
    }
    this.auth.obtenerModulos(usuario, sistema).subscribe(observer);
  }

  /*onObtenerRoles(id: number) {
    this.auth.obtenerRoles(id).subscribe()
  }*/

  onLogout() {
    this.auth.onLogout().subscribe();
  }
}
