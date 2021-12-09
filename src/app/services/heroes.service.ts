import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroModel } from '../models/hero.model';
import { map, delay } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private URL = 'https://hero-crud-6baf5-default-rtdb.firebaseio.com'
  element = {
    system_name : '',
    integration_id : ''
  };
  private integrationSelected: string = '';
  private integrationList = [this.element, this.element, this.element];

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

  deleteHero(id: string) {
    return this.http.delete(`${this.URL}/heroes/${id}.json`);
  }

  getHero(id: string) {
    return this.http.get(`${this.URL}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http.get(`${this.URL}/heroes.json`)
      .pipe(
        map((response: any) => this.createHeroesArray(response)),
        delay(500)
      );
  }

  private createHeroesArray(heroesObj: any) {

    if (heroesObj === null) return [];

    const heroes: HeroModel[] = [];

    Object.keys(heroesObj).forEach(key => {
      const hero: HeroModel = heroesObj[key];
      hero.id = key;
      heroes.push(hero);
    })

    let integration_name = '';



    this.integrationList.forEach(element => {
      if(element.system_name === integration_name){
        this.integrationSelected = element.integration_id
        return;
      }
    });


    return heroes;
  }




}
