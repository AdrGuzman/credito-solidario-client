import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';

import { Breadcrumb } from './breadcrumb';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: Breadcrumb[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.breadcrumbs = [];
  }

  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      let root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadCrumbs(root);
    });
  }

  private getBreadCrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []) : Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';

    // Obtiene las rutas hijas
    let children: ActivatedRoute[] = route.children;

    // Retorna si no hay mas hijos
    if (children.length === 0) {
      return breadcrumbs;
    }

    // Itera sobre cada hijo
    for (let child of children) {
      // Verifica la ruta primaria
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // Verifica que la propiedad de los datos personalizados "breadcrumb" este especificada en la ruta
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadCrumbs(child, url, breadcrumbs);
      }

      // Obtiene el segmento URL de la ruta
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // Une la URL de la ruta a la URL
      url += `/${routeURL}`;

      // Agrega el breadcrumb
      let breadcrumb: Breadcrumb = {
        etiqueta: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        parametros: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);
      console.log('bread', breadcrumbs);

      // Recursivo
      return this.getBreadCrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
