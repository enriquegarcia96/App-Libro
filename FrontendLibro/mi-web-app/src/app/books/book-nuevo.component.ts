import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { BooksService } from './books.service';
import { MatDialog } from '@angular/material/dialog';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.service';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: './bookNuevo.component.html'
})


export class BookNuevoComponent implements OnInit{

  selectAutor: string;
  selectAutorTexto: string;
  fechaPublicacion: string;

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  autores: Autor[] = []; // para el combo box

  constructor( private bookService: BooksService, private dialogRef: MatDialog, private autoresService: AutoresService ){}

  ngOnInit(): void{
    this.autores = this.autoresService.obtenerAutores(); // para que lleve el combo box
  }


  select(event: MatSelectChange){
    // capturo el label del texto del combo box
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }


  guardarLibro(form: NgForm){

    if (form.valid){
      this.bookService.guardarLibro({
        libroId: 9,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: this.selectAutorTexto,
        precio: form.value.precio,
        fechaPublicacion: new Date(this.fechaPublicacion)
      });
      this.dialogRef.closeAll(); // cierre el dialogo
    }
  }

}
