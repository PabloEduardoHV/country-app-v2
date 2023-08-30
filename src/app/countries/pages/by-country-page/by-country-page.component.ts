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
  public isLoading: boolean;
  public userAlreadySearchedACountry: boolean;
  private endpoint: string = 'name';

  /* Metodos */
  constructor(private countriesService: CountriesService) {
    this.isLoading = false;
    this.userAlreadySearchedACountry = false;
  }

  public searchByCountry(country: string): void {
    this.isLoading = true;
    this.countriesService.getCountryRequest(country, this.endpoint)
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
      this.userAlreadySearchedACountry = true;
    });
  }
}
