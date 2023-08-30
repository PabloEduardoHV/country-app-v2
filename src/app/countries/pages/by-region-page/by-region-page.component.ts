import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {
  /* Propiedades */
  public countries: Country[] = [];
  public isLoading: boolean;
  public userAlreadySearchedACountry: boolean;
  private endpoint: string = 'region';

  /* Metodos */
  constructor(private countriesService: CountriesService) {
    this.isLoading = false;
    this.userAlreadySearchedACountry = false;
  }
  public searchByRegion(region: string) {
    this.isLoading = true;
    this.countriesService.getCountryRequest(region, this.endpoint)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
      this.userAlreadySearchedACountry = true;
    });
  }
}
