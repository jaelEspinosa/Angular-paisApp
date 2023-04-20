import { Region } from './region-type';
import { Country } from "./paises-interfaces";

export interface CacheStore {
  porCapital  : TermCountries;
  porPais     : TermCountries;
  porRegion   : RegionCountries;
}

export interface TermCountries {
  term      : string;
  countries : Country[];
}

export interface RegionCountries {
  region    : Region;
  countries : Country[];
}
