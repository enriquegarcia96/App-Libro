import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})

export class UsuarioComponent {

  usuarios = ['Diana', 'Omar', 'shellsea', 'enrique'];

  usuarioNombre = '';
  visible = false;

  constructor(){

    setTimeout( () => {
      this.visible = true;
    }, 3000);

  }

  onAgregarUsuario(): any{

    this.usuarios.push(this.usuarioNombre);
    this.usuarioNombre = '';
  }


}
