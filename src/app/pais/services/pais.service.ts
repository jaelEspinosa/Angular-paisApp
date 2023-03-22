import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/paises-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1'


  constructor(private http:HttpClient) { }

  buscarPais( termino: string): Observable<Country[]>{
    const url = `${this.apiUrl}/translation/${termino}`;


    return this.http.get<Country[]>( url );
  }

  buscarPaisPorCapital( termino: string ): Observable<Country[]>{
   const url = `${this.apiUrl}/capital/${termino}`

   return this.http.get<Country[]>( url )

  }

  buscarPaisPorCodigo( id: string): Observable<Country[]>{

    const url = `${this.apiUrl}/alpha/${id}`
    return this.http.get<Country[]>( url )

  }

  buscarPaisPorRegion( region: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`
    return this.http.get<Country[]>( url )
  }
}
