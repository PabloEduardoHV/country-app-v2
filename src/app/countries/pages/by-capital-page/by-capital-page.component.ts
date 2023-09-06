import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit{
  /* Propiedades */
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public userAlreadySearchedACountry: boolean;
  public initialTerm: string = '';
  private endpoint: string = 'capital';


  /* Metodos */
  constructor(private countriesService: CountriesService) {
    this.userAlreadySearchedACountry = false;
  }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStorage.byCapital.countries;
    this.initialTerm = this.countriesService.cacheStorage.byCapital.term;
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
