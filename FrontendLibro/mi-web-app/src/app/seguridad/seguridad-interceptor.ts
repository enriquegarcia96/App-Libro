import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from './seguridad.service';

@Injectable()
export class SeguridadInterceptor implements HttpInterceptor{

  constructor(private seguridadService: SeguridadService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){

    /**
     * obtiene el token del usuario
     * asi es como tengo el token en el localstorage
     */
    const tokenSeguridad = this.seguridadService.obtenerToken();
    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenSeguridad) // importante el espacio en BEARER
    });

    return next.handle(request);
  }

}
