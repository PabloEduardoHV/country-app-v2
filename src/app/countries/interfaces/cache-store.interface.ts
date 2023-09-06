import { Country } from "./country.interface"
import { Region } from "./region.type";

export interface CacheStore {
  byCapital:   CountryData,
  byCountries: CountryData,
  byRegion:    RegionData
}

export interface CountryData {
  term:      string;
  countries: Country[];
}

export interface RegionData {
  term?:     Region,
  countries: Country[]
}
