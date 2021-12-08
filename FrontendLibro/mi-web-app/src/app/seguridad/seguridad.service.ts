import { Subject } from 'rxjs';
import { Usuario } from './usuario.model';
import { loginData } from './login-data-model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class SeguridadService{
  seguridadCambio = new Subject<boolean>();

  private usuario: Usuario;

  constructor( private router: Router ){}

  registrarUsuario(usr: Usuario){
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellidos: usr.apellidos,
      username: usr.username,
      password: ''
    };

    this.seguridadCambio.next(true);
    this.router.navigate(['/']);
  }

  login(loginData: loginData){
    this.usuario = {
      email: loginData.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: '',
      apellidos: '',
      username: '',
      password: ''
    };
    this.seguridadCambio.next(true);
    this.router.navigate(['/']);
  }

  salirSesion (){
    this.usuario = null;
    this.seguridadCambio.next(false);
    this.router.navigate(['/login']);
  }

  obtenerUsuario(){
    return {...this.usuario} // devuelve el usuario mas actualizado
  }

  onSesion(): boolean{
    return this.usuario != null;
  }


}
