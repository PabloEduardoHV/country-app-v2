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


  /* Metodos */
  constructor(private countriesService: CountriesService) {

  }
  public searchByCapital(term: string): void {
    this.countriesService.searchCapital(term)
    .subscribe( countries => {
      this.countries = countries;
    } );
  }
}
