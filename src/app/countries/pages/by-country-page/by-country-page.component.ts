import { CountriesService } from './../../services/countries.service';
import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent {
  /* Propiedades */
  public countries: Country[] = [];

  /* Metodos */
  constructor(private countriesService: CountriesService) {

  }

  public searchByCountry(country: string): void {
    this.countriesService.searchCountry(country)
    .subscribe( countries => {
      this.countries = countries;
    });
  }
}
