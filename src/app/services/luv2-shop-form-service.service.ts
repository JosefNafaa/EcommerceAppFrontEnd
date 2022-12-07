import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormServiceService {
  private countriesUrl=  'http://localhost:8080/api/countries';
  private statesUrl='http://localhost:8080/api/states';

  constructor(private httpClient :HttpClient)
   { }

   getCountriesList(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountry>(this.countriesUrl).pipe(
     map(response=>response._embedded.countries)
    );

   }

   getStatesByCountryCode(code: string) :  Observable<State[]>{
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${code}`;
    return this.httpClient.get<GetResponseState>(searchStatesUrl).pipe(
      map(response=>response._embedded.states)
     );
   }


  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Month" dropdown list
    // - start at current month and loop until

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Year" downlist list
    // - start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}

interface GetResponseCountry {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseState {
  _embedded: {
    states: State[];
  }
}
