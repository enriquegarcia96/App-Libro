import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  estadoUsuario: boolean;
  usuarioSubcription: Subscription;

  constructor( private seguridadServicio: SeguridadService ) { }

  ngOnInit(): void {
    this.usuarioSubcription = this.seguridadServicio.seguridadCambio.subscribe( status =>{
      this.estadoUsuario = status;
    });
  }

  onMenuToggleDispatch(){
    this.menuToggle.emit();
  }

  ngOnDestroy(){
    this.usuarioSubcription.unsubscribe();
  }

  terminarSesion(){
    this.seguridadServicio.salirSesion();
  }
}
