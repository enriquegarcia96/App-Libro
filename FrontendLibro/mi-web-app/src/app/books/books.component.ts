import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo.component';
import { Subscription } from 'rxjs';
import { PaginationBooks } from './pagination.books.model';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  timeout: any = null;
  bookData: Books[] = [];
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;

  private bookSubcription: Subscription;

  totalLibros = 0;
  librosPorPagina = 2;
  paginaCombo = [1, 2, 5, 10];
  paginaActual = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue = null;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  // .- paginador para la vista .- //
  eventoPaginador(event: PageEvent): void {
    this.librosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.booksService.obtenerLibros(this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  ordenarColumna(event: any ): void {
    this.sort = event.active;
    this.sort = event.direction;
    this.booksService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      event.active, // captura el nombre de la columna de la tabla
      event.direction,
      this.filterValue
    );
  }



  // busquedas por la base de datos de forma dinamica .-//
  hacerFiltro(event: any): void {
    clearTimeout(this.timeout);
    const  $this = this;
    this.timeout = setTimeout(() => {
      if (event.keyCode !== 13) {
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value
        };

        $this.filterValue = filterValueLocal;

        // creo el request para el servidor .-//
        $this.booksService.obtenerLibros(
          $this.librosPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );
      }
    }, 1000);

  }

  abrirDialog(): void {
    const dialogRef  = this.dialog.open(BookNuevoComponent, {
      width: '550px', // para el ancho de la tajeta
    });

    dialogRef.afterClosed()
    .subscribe( () => {
      // refresca el dahsborm la lista de los libros
      this.booksService.obtenerLibros(this.librosPorPagina, this.paginaActual, this.sort, this.sortDirection, this.filterValue);
    });

  }

  ngOnInit(): void {
    this.booksService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );

    this.bookSubcription = this.booksService
      .obtenerActualListener()
      .subscribe((pagination: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalLibros = pagination.totalRows;
    });
  }

  ngOnDestroy(): void {
    this.bookSubcription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }
}
