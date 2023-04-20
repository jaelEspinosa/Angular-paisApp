import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, tap } from 'rxjs';
import { Country } from '../interfaces/paises-interfaces';
import { CacheStore } from '../interfaces/cache-store';
import { Region } from '../interfaces/region-type';

@Injectable({
  providedIn: 'root'
})

export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  public cacheStore:CacheStore = {
    porCapital:{ term:'', countries:[]},
    porPais:{ term:'', countries:[]},
    porRegion :{ region:'', countries:[]},

  }

  get httpParams () {
    return new HttpParams().set('fields', 'name,capital,flags,cca2')
  }

  private getCountriesRequest( url:string ): Observable<Country[]> {
      return this.http.get<Country[]>( url, { params: this.httpParams } )


  }

  constructor(private http:HttpClient) { }

  buscarPais( term: string): Observable<Country[]>{

    const url = `${this.apiUrl}/translation/${term}`;
    return this.getCountriesRequest( url )
    .pipe(
      tap( countries => this.cacheStore.porPais = { term, countries})

   );
  }

  buscarPaisPorCapital( term: string ): Observable<Country[]>{

   const url = `${this.apiUrl}/capital/${term}`
   return this.getCountriesRequest( url )
     .pipe(
        tap( countries => this.cacheStore.porCapital = { term, countries})

     );
  }

  buscarPaisPorCodigo( id: string): Observable<Country[]>{

    const url = `${this.apiUrl}/alpha/${id}`
    return this.http.get<Country[]>( url )
  }

  buscarPaisPorRegion( region: Region ): Observable<Country[]>{

    const url = `${this.apiUrl}/region/${region}`
    return this.getCountriesRequest( url )
    .pipe(
      tap( countries => this.cacheStore.porRegion = { region, countries })

   );
  }
}
