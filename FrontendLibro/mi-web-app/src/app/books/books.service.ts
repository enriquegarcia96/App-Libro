import { Books } from './books.module';

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
      titulo: 'Algoritmos',
      descripcion: 'libro basico',
      autor: 'enrique garcia',
      precio: 25,
    },
    {
      libroId: 3,
      titulo: 'Algoritmos',
      descripcion: 'libro basico',
      autor: 'enrique garcia',
      precio: 30,
    },
    {
      libroId: 4,
      titulo: 'Algoritmos',
      descripcion: 'libro basico',
      autor: 'enrique garcia',
      precio: 99,
    },
  ];

  obtenerLibros(){
    return this.booksLista.slice();
  }

}
