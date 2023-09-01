import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  /* Propiedades */
  private apiUrl: string = 'https://restcountries.com/v3.1';

  /* Metodos */
  constructor(private http: HttpClient) {

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
      catchError( error => of([]) )
    );
  }
}
