import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedaUsuario'
})
export class BusquedaUsuarioPipe implements PipeTransform {

  transform(usuarios: any, busqueda: string): any {
    if (busqueda) {
      busqueda = busqueda.toLowerCase();
      return usuarios.filter((usuario: any) => usuario.model.toLowerCase().indexOf(busqueda)  > -1);
    }

    return usuarios;
  }

}
