import { Books } from './books.model';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationBooks } from './pagination.books.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // private booksLista: Books[] = [
  //   {
  //     libroId: 1,
  //     titulo: 'Algoritmos',
  //     descripcion: 'libro basico',
  //     autor: 'enrique garcia',
  //     precio: 18,
  //   },
  //  ...
  // ];

  baseUrl = environment.baseUrl;
  private booksLista: Books[] = [];
  bookSubject = new Subject();
  bookPagination: PaginationBooks;
  bookPaginationSubject = new Subject<PaginationBooks>();

  constructor( private http: HttpClient ){

  }

  obtenerLibros(libroPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) {
    // return this.booksLista.slice();

    const request = {
      pageSize: libroPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    };

    this.http.post<PaginationBooks>(this.baseUrl + 'api/LibroGet/Pagination', request)
    .subscribe((response) => {

      this.bookPagination = response;
      this.bookPaginationSubject.next(this.bookPagination); // para que me reflege los datos nuevos

    });
  }

  obtenerActualListener(){
    return this.bookPaginationSubject.asObservable(); // tiene la data que devuelve el servidor (data nuevo)
  }

  guardarLibro(book: Books) {
    // this.booksLista.push(book);
    this.http.post(this.baseUrl + 'api/LibroGet', book)
      .subscribe((response) => {
        this.bookSubject.next(); // para actualizar la lista y devuelve el libro actualizado
      });
  }

  // .- escuha los nuevos cambios .- //
  guardarLibroListener(){
    return this.bookSubject.asObservable();
  }
}
