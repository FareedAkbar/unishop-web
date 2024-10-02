interface Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
  }
  
  interface Translations {
    kr: string;
    'pt-BR': string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    cn: string;
    tr: string;
    ru: string;
    uk: string;
    pl: string;
  }
  
  export interface Country {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    region_id: string;
    subregion: string;
    subregion_id: string;
    nationality: string;
    timezones: Timezone[];
    translations: Translations;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
  }
  

  export interface State {
    id: string;
    country_code: string;
    name: string;
  }
  
  export interface City {
    id: number;
    state_id: number;
    name: string;
  }

  export interface CountriesData {
    statesData: State[];
    citiesData: City[];
    countryData: Country[];
  }