import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent {
  /* Propiedades */
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public userAlreadySearchedACountry: boolean;
  private endpoint: string = 'capital';


  /* Metodos */
  constructor(private countriesService: CountriesService) {
    this.userAlreadySearchedACountry = false;
  }
  public searchByCapital(capital: string): void {
    this.isLoading = true;
    this.countriesService.getCountryRequest(capital, this.endpoint)
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
      this.userAlreadySearchedACountry = true;
    } );
  }
}
