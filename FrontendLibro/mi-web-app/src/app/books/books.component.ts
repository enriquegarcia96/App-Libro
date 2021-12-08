import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  bookData: Books[] = [];
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;

  private bookSubcription: Subscription;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;

  }

  abrirDialog(){
    this.dialog.open(BookNuevoComponent, {
      width: '350px', // para el ancho de la tajeta
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.booksService.obtenerLibros();
    this.bookSubcription = this.booksService.bookSubject.subscribe(() => {
      this.dataSource.data = this.booksService.obtenerLibros();
    });
  }

  ngOnDestroy(){
    this.bookSubcription.unsubscribe();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

}
