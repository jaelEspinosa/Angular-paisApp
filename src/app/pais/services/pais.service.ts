import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country, CacheStore, Region } from '../interfaces';



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

  constructor(private http:HttpClient) {
    this.loadFromLocalStorage()
   }



  private saveToLocalStorage() {
    localStorage.setItem('cachestore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage() {

    if(!localStorage.getItem('cachestore')) return;

   this.cacheStore = JSON.parse(localStorage.getItem('cachestore')!)


  }

  buscarPais( term: string): Observable<Country[]>{

    const url = `${this.apiUrl}/translation/${term}`;
    return this.getCountriesRequest( url )
    .pipe(
      tap( countries =>this.cacheStore.porPais = { term, countries}),
      tap( ()=> this.saveToLocalStorage())
    );
  }

  buscarPaisPorCapital( term: string ): Observable<Country[]>{

   const url = `${this.apiUrl}/capital/${term}`
   return this.getCountriesRequest( url )
     .pipe(
        tap( countries =>this.cacheStore.porCapital = { term, countries}),
        tap( ()=> this.saveToLocalStorage())
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
      tap( countries => this.cacheStore.porRegion = { region, countries }),
      tap( ()=> this.saveToLocalStorage())
   );
  }
}
