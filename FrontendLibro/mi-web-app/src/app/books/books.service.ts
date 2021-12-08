import { Books } from './books.model';
import { Subject } from 'rxjs';

export class BooksService {
  private booksLista: Books[] = [
    {
      libroId: 1,
      titulo: 'Algoritmos',
      descripcion: 'libro basico',
      autor: 'enrique garcia',
      precio: 18,
    },
    {
      libroId: 2,
      titulo: 'Java',
      descripcion: 'libro basico',
      autor: 'enrique garcia',
      precio: 25,
    },
    {
      libroId: 3,
      titulo: 'Angular',
      descripcion: 'libro basico',
      autor: 'enrique garcia',
      precio: 30,
    },
    {
      libroId: 4,
      titulo: 'React',
      descripcion: 'libro basico',
      autor: 'enrique garcia',
      precio: 99,
    },
  ];

  bookSubject = new Subject<Books>();

  obtenerLibros(){
    return this.booksLista.slice();
  }

  guardarLibro(book: Books){

    this.booksLista.push(book);
    this.bookSubject.next(book); // para actualizar la lista y devuelve el libro actualizado

  }

}
