import { AbstractControl } from '@angular/forms';

export class ValidacionContrasenia {
    static ContraseniaCoincide(AC: AbstractControl) {
        let contrasenia = AC.get('contrasenia').value;
        let confirmarContrasenia = AC.get('confirmarContrasenia').value;

        if (contrasenia != confirmarContrasenia) {
            AC.get('confirmarContrasenia').setErrors({ContraseniaCoincide: true});
        } else {
            return null;
        }
    }
}
