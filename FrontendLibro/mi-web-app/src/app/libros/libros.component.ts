import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LibrosService } from '../services/libros.service';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
})
export class LibrosComponent implements OnInit, OnDestroy {

  libros: string[] = [];

  constructor(private librosService: LibrosService){}
  private libroSubcription: Subscription;

  eliminarLibro(libro: any){}

  guardarLibro(f: any){
    if (f.valid){
      this.librosService.agregarLibro(f.value.nombreLibro);
    }

  }

  ngOnInit(){
    this.libros = this.librosService.obtenerLibros();

    // .- cada vez que yo agrego un nuevo libro me agrege el libro en el arreglo .-//
    this.libroSubcription = this.librosService.librosSubject.subscribe( () => {
      this.libros = this.librosService.obtenerLibros();
    });
  }

  ngOnDestroy(){
    this.libroSubcription.unsubscribe();
  }

}
