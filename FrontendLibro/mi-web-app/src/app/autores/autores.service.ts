import { Autor } from './autor.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoresService{

  private autoresLista: Autor[] = [

    {autorId: 1, nombre: 'Enrique', apellido: 'Garcia', gradoAcademico: 'Ingeniero ciencias de la computacion'},
    {autorId: 2, nombre: 'Omar', apellido: 'Guerra', gradoAcademico: 'Ingeniero de sistemas '},
    {autorId: 3, nombre: 'Shellsea', apellido: 'Gonzales', gradoAcademico: 'Abogada '},
    {autorId: 4, nombre: 'Diana', apellido: 'Rivere', gradoAcademico: 'Trabajo social'},
  ];

  obtenerAutores(){
    return this.autoresLista.slice();
  }


}
