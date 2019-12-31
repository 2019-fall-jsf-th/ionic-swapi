import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge, race, empty, zip, of } from 'rxjs';
import { expand, groupBy, tap, mergeMap, toArray, map } from 'rxjs/operators'
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(
    private httpSvc: HttpClient
    , private sharedDataSvc: SharedDataService
  ) { }

  getPlanets() {
    // const p1 = this.httpSvc.get("https:/swapi.co/api/planets");
    // const p2 = this.httpSvc.get("https:/swapi.co/api/planets/?page=2");
    // const p3 = this.httpSvc.get("https:/swapi.co/api/planets/?page=3");
    // const p4 = this.httpSvc.get("https:/swapi.co/api/planets/?page=4");
    // const p5 = this.httpSvc.get("https:/swapi.co/api/planets/?page=5");
    // const p6 = this.httpSvc.get("https:/swapi.co/api/planets/?page=6");
    // const p7 = this.httpSvc.get("https:/swapi.co/api/planets/?page=7");

    // return merge(p1, p2, p3, p4, p5, p6, p7);

    const url = `https:/swapi.co/api/${this.sharedDataSvc.text.toLowerCase()}`;

    return this.httpSvc.get(url).pipe(
      expand(data =>
        (<any> data).next ?
        this.httpSvc.get((<any> data).next) :
        empty()
      )
      //, groupBy(x => (<any> x).results.map(y => y.climate))
      //, tap(x => console.log(x))      
      //, mergeMap(group => zip(of(group.key), group.pipe(toArray())))
      //, map(x => ({ results: [{ name: x.key}]}))
      //, tap(x => console.log(x))      
    );
  }
}
