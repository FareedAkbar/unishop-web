"use server";

import type { City, CountriesData, Country, State} from '~/types/country.ts'

const countriesJSON =
"https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json";
const statesJSON =
"https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json";
const citiesJSON =
"https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json";




export async function getCountry(): Promise<CountriesData> {

        try {
          const [countriesRes, statesRes, citiesRes] = await Promise.all([
            fetch(countriesJSON),
            fetch(statesJSON),
            fetch(citiesJSON),
          ]);
          const countryData: Country[] = await countriesRes.json() as Country[];
          const statesData: State[] = await statesRes.json() as State[];
          const citiesData: City[] = await citiesRes.json() as City[];
          
         
            return {
                statesData, citiesData, countryData
            }
        } catch (error) {
          console.error("Error fetching data:", error);
          return {
            statesData: [],
            citiesData: [],
            countryData: [],
          };
        }
} 

// export const getCachedCountriesList = unstable_cache(
//     async () => getCountry(),
//     ['countries-list'], // Unique cache key
//     {
//       tags: ['countries'], // Optional tags for cache invalidation
//       revalidate: 60, // Revalidate cache every 60 seconds
//     }
//   );

  export const getCachedCountriesList =()=>(
    getCountry()
  );
