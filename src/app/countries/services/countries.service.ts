import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, delay, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  /* Propiedades */
  public cacheStorage: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { countries: [] }
  }
  private apiUrl: string = 'https://restcountries.com/v3.1';

  /* Metodos */
  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }
  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code.toUpperCase()}`)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null ),
      catchError( error => of(null) )
    );
  }
  public getCountryRequest(term: string, endpoint: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/${endpoint}/${term.toLowerCase()}`)
    .pipe(
      catchError( error => of([]) ),
      tap(countries => {
        if( endpoint === 'capital' ) {
          this.cacheStorage.byCapital = {term, countries}
        } else if ( endpoint === 'name' ) {
          this.cacheStorage.byCountries = {term, countries}
        } else {
          let region: Region = '';
          if(term === 'Africa') {
            region = 'Africa'
          } else if ( term === 'Americas' ) {
            region = 'Americas'
          } else if ( term === 'Asia' ) {
            region = 'Asia'
          } else if ( term === 'Europe' ) {
            region = 'Europe'
          } else {
            region = 'Oceania'
          }
          this.cacheStorage.byRegion = {term: region, countries}
        }
      }),
      tap(() => {
        this.saveToLocalStorage();
      })
    );
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStorage))
  }
  private loadFromLocalStorage(): void {
    if( !localStorage.getItem('cacheStorage') ) return;
    this.cacheStorage = JSON.parse( localStorage.getItem('cacheStorage')! );
  }
}
