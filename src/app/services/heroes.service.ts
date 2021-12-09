import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroModel } from '../models/hero.model';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private URL = 'https://hero-crud-6baf5-default-rtdb.firebaseio.com'

  constructor(private http: HttpClient) { }

  createHero(hero: HeroModel) {
    return this.http.post(`${this.URL}/heroes.json`, hero)
      .pipe(
        map((response: any) => {
          hero.id = response.name;
          return hero;
        })
      );
  }

  updateHero(hero: HeroModel) {

    //break the reference relation of id so the hero sent doesn't have an id,
    //but the hero received keeps it.
    const heroTemp = {
      ...hero
    };

    delete heroTemp.id;

    return this.http.put(`${this.URL}/heroes/${hero.id}.json`, heroTemp);
  }
}
