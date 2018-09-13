import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { RolesUsuarios } from '../../../shared/modelos/roles-usuarios';
import { AuthService } from '../../auth/_services/auth.service';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.scss']
})
export class GestionUsuarioComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  estaCargando: Boolean = false;
  roles: RolesUsuarios[];
  dataSource: MatTableDataSource<RolesUsuarios>;
  displayColumns = ['id', 'nombre', 'acciones'];

  constructor(private authServicio: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
  }

  obtenerRolesUsuario(): void {
    this.estaCargando = true;
    const usuarioId = +this.route.snapshot.paramMap.get('id');
    //this.authServicio.obtenerRoles(usuarioId).subscribe();
  }

}
