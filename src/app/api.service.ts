import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable, concat, combineLatest } from "rxjs";
import { map, reduce } from "rxjs/operators";

import { Film, Homeworld, People, Response, Transport } from "./interfaces";

const BASE_URL = 'https://swapi.dev/api/';

@Injectable()
export class ApiService {
  constructor(public http: HttpClient) { }

  getPeople(url?: string): Observable<Response<People>> {
    return this.http.get<Response<People>>(url || BASE_URL + 'people')
  }

  loadFullData(people: People) {
    let { films, homeworld, created, edited, species, starships, vehicles, url, ...rest } = people;
    const initial = { character : rest }

    const films$ = this.getFilms(films);
    const starships$ = this.getStarships(starships);
    const vehicles$ = this.getVehicles(vehicles);
    const transport$ = combineLatest([vehicles$, starships$])
      .pipe(
        map(data => ({ transport: { ...data[0], ...data[1] }}))
      );

    const homeworld$ = this.getHomeworld([homeworld])

    return concat(films$, transport$, homeworld$)
      .pipe(
        reduce((acc, one) => ({ ...acc, ...one }), initial)
      );
  }

  private getFilms(urls: string[]): Observable<{ films: Film[] }> {
    return forkJoin(this.getRequests(urls))
      .pipe(
        map(data => ( { films: data.map(({ title, release_date }) => ({ title, release_date})) }))
      )
  }

  private getStarships(urls: string[]): Observable<{ starships: Transport[] }> {
    return forkJoin(this.getRequests(urls))
      .pipe(
        map(data => ({ starships: data.map(({ name, model }) => ({ name, model})) }))
      )
  }

  private getVehicles(urls: string[]): Observable<{ vehicles: Transport[] }> {
    return forkJoin(this.getRequests(urls))
      .pipe(
        map(data => ({ vehicles: data.map(({ name, model }) => ({ name, model})) }))
      )
  }

  private getHomeworld(urls: string[]): Observable<{ homeworld: Homeworld }> {
    return forkJoin(this.getRequests(urls))
      .pipe(
        map(data => ({ homeworld: { name: data[0].name, population: data[0].population }}))
      )
  }

  private getRequests(urls: string[]): Observable<any>[] {
    return urls.map(url => this.http.get(url))
  }
}
