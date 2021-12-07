import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { SeguridadService } from './seguridad.service';

@Injectable()
export class SeguridadRouter implements CanActivate {
  constructor(
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  // tslint:disable-next-line: typedef
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.seguridadService.onSesion()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
