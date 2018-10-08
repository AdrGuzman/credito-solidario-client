import { Directive, OnInit, Input, ElementRef } from '@angular/core';

import { AuthService } from '../../../pages/auth/_services/auth.service';

@Directive({
  selector: '[InhabilitarSiNoAutorizado]'
})
export class InhabilitarSiNoAutorizadoDirective implements OnInit {
  @Input('InhabilitarSiNoAutorizado') autorizacion: string;

  constructor(
    private el: ElementRef,
    private authServicio: AuthService
  ) { }

  ngOnInit() {
    console.log('Esto se renderiza', this.autorizacion);
    if (!this.authServicio.tieneAutorizacion(this.autorizacion)) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
