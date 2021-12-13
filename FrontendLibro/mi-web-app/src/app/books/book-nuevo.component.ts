import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { BooksService } from './books.service';
import { MatDialog } from '@angular/material/dialog';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: './bookNuevo.component.html',
})
export class BookNuevoComponent implements OnInit, OnDestroy {
  selectAutor: string;
  selectAutorTexto: string;
  fechaPublicacion: string;

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  autores: Autor[] = []; // para el combo box
  autorSubcription: Subscription;


  constructor(
    private bookService: BooksService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService
  ) {}

  ngOnInit(): void {
    //this.autores = this.autoresService.obtenerAutores();

    // para que lleve el combo box
    this.autorSubcription =  this.autoresService.obtenerAutores();
    this.autoresService
      .obtenerActualListener()
      .subscribe((autoresBackend: Autor[]) => {
        this.autores = autoresBackend;
      });
  }

  ngOnDestroy(): void {
    this.autorSubcription.unsubscribe();
  }

  selected(event: MatSelectChange) {
    // capturo el label del texto del combo box
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }

  guardarLibro(form: NgForm) {
    if (form.valid) {

      const autorRequest = {
        id: this.selectAutor,
        nombreCompleto: this.selectAutorTexto
      };

      const libroRequest = {
        id: null,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        precio: parseInt( form.value.precio ),
        fechaPublicacion: new Date(this.fechaPublicacion)
      };

      this.bookService.guardarLibro(libroRequest);
      this.autorSubcription = this.bookService.guardarLibroListener()
      .subscribe( () => {
        this.dialogRef.closeAll(); // se ciera el dashbor y se actualiza
      } );
    }
  }


}
