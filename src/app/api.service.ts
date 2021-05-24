import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable } from "rxjs";
import {map, mergeMap} from "rxjs/operators";

import { People, Response } from "./interfaces";

const BASE_URL = 'https://swapi.dev/api/';

@Injectable()
export class ApiService {
  constructor(public http: HttpClient) { }

  getPeople(url?: string): Observable<Response<People>> {
    return this.http.get<Response<People>>(url || BASE_URL + 'people')
  }

  loadFullData(people: People) {
    return this.getFilms(people.films)

    // return forkJoin({
    //   homeworld: this.http.get(people.homeworld).pipe(map((data: any) => ({ name: data.name, population: data.population }))),
    //   films: this.getFilms(people.films),
    //   // starships: forkJoin(this.getRequests(people.starships)),
    //   // vehicles: forkJoin(this.getRequests(people.vehicles))
    // })
  }

  private getFilms(urls: string[]) {
    return forkJoin(this.getRequests(urls))
      .pipe(
        mergeMap(data => {
          console.log(data);
          return data;
        })
      )
  }

  private getRequests(urls: string[]): Observable<any>[] {
    return urls.map(url => this.http.get(url))
  }
}
