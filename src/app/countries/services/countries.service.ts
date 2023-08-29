import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
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
  public searchCapital(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${term.toLowerCase()}`)
    .pipe(
      catchError( error => of([]) )
    );
  }
  public searchCountry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${term.toLowerCase()}`)
    .pipe(
      catchError( error => of([]) )
    );
  }
  public searchRegion(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${term.toLowerCase()}`)
    .pipe(
      catchError( error => of([]) )
    );
  }

}
