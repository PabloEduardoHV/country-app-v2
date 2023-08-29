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

  /* Metodos */
  constructor(private countriesService: CountriesService) {

  }
  public searchByRegion(region: string) {
    this.countriesService.searchRegion(region)
    .subscribe(countries => {
      this.countries = countries;
    });
  }
}
