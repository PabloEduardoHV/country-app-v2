import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {
  /* Propiedades */
  public countries: Country[] = [];
  public isLoading: boolean;
  public userAlreadySearchedACountry: boolean;
  public initiaTerm: string = '';
  private endpoint: string = 'name';

  /* Metodos */
  constructor(private countriesService: CountriesService) {
    this.isLoading = false;
    this.userAlreadySearchedACountry = false;
  }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStorage.byCountries.countries;
    this.initiaTerm = this.countriesService.cacheStorage.byCountries.term;
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
