import { Autor } from './autor.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoresService{

  baseUrl = environment.baseUrl;
  private autoresLista: Autor[] = [];

  private autoresSubject = new Subject<Autor[]>();

  constructor( private http: HttpClient ){}

  // private autoresLista: Autor[] = [

  //   {autorId: 1, nombre: 'Enrique', apellido: 'Garcia', gradoAcademico: 'Ingeniero ciencias de la computacion'},
  //   {autorId: 2, nombre: 'Omar', apellido: 'Guerra', gradoAcademico: 'Ingeniero de sistemas '},
  //   {autorId: 3, nombre: 'Shellsea', apellido: 'Gonzales', gradoAcademico: 'Abogada '},
  //   {autorId: 4, nombre: 'Diana', apellido: 'Rivere', gradoAcademico: 'Trabajo social'},
  // ];

  obtenerAutores(){

    // conecto con el backend .-//
    this.http.get<Autor[]>(this.baseUrl + 'api/LibreriaAutor')
    .subscribe( (data) => {
     this.autoresLista = data;
     this.autoresSubject.next([...this.autoresLista]); // para que actualize el formulario
    });

    // return this.autoresLista.slice();
  }

  obtenerActualListener(){
    return this.autoresSubject.asObservable();
  }


}
