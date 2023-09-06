import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';
@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit {
  /* Propiedades */
  public countries: Country[] = [];
  public isLoading: boolean;
  public userAlreadySearchedACountry: boolean;
  private endpoint: string = 'region';
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  /* Metodos */
  constructor(private countriesService: CountriesService) {
    this.isLoading = false;
    this.userAlreadySearchedACountry = false;
  }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStorage.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStorage.byRegion.term;
  }
  public searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.isLoading = true;
    this.countriesService.getCountryRequest(region, this.endpoint)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
      this.userAlreadySearchedACountry = true;
    });
  }
}
