import { Subject } from 'rxjs';

export class LibrosService {

  librosSubject = new Subject();

  private libros = ['Libro de kike', 'Libro de gonzales', 'diseño grafico'];

  agregarLibro(libroNombre: string) {
    this.libros.push(libroNombre);
    this.librosSubject.next(); // para que se actualize el arreglo
  }

  eliminarLibro(libroNombre: string){
    this.libros = this.libros.filter( x => x !== libroNombre);
    this.librosSubject.next();
  }

  obtenerLibros() {
    return [...this.libros];
  }
}
