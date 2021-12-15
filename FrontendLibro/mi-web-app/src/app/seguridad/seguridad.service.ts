import { Subject } from 'rxjs';
import { Usuario } from './usuario.model';
import { loginData } from './login-data-model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private token: string;
  baseUrl = environment.baseUrl;
  private usuario: Usuario;
  seguridadCambio = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  cargarUsuario(): void {
    const tokenBrowser = localStorage.getItem('token');
    if (!tokenBrowser) {
      return;
    }

    this.token = tokenBrowser;
    this.seguridadCambio.next(true);

    this.http.get<Usuario>(this.baseUrl + 'usuario').subscribe((response) => {
      // console.log('login respuesta', response);

      this.token = response.token;
      this.usuario = {
        email: response.email,
        nombre: response.nombre,
        apellido: response.apellido,
        token: response.token,
        password: '',
        username: response.username,
        usuarioId: response.usuarioId,
      };
      this.seguridadCambio.next(true);
      localStorage.setItem('token', response.token); // guardo el token para poder usarlo
    });
  }

  obtenerToken(): string {
    return this.token;
  }

  registrarUsuario(usr: Usuario): void {
    this.http
      .post<Usuario>(this.baseUrl + 'usuario/registrar', usr)
      .subscribe((response) => {
        // console.log('login respuesta', response);

        this.token = response.token;
        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          token: response.token,
          password: '',
          username: response.username,
          usuarioId: response.usuarioId,
        };
        this.seguridadCambio.next(true);
        localStorage.setItem('token', response.token); // guardo el token para poder usarlo
        this.router.navigate(['/']);
      });
    // this.usuario = {
    //   email: usr.email,
    //   usuarioId: Math.round(Math.random() * 10000).toString(),
    //   nombre: usr.nombre,
    //   apellidos: usr.apellidos,
    //   username: usr.username,
    //   password: ''
    // };

    // this.seguridadCambio.next(true);
    // this.router.navigate(['/']);
  }

  login(loginData: loginData): void {
    this.http
      .post<Usuario>(this.baseUrl + 'usuario/login', loginData)
      .subscribe((response) => {
        // console.log('login respuesta', response);

        this.token = response.token;
        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          token: response.token,
          password: '',
          username: response.username,
          usuarioId: response.usuarioId,
        };
        this.seguridadCambio.next(true);
        localStorage.setItem('token', response.token); // guardo el token para poder usarlo
        this.router.navigate(['/']);
      });
  }

  salirSesion(): void {
    this.usuario = null;
    this.seguridadCambio.next(false);
    localStorage.removeItem('token'); // elimino el token de la sesion
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line: typedef
  obtenerUsuario() {
    return { ...this.usuario }; // devuelve el usuario mas actualizado
  }

  onSesion(): boolean {
    return this.token != null;
  }
}
