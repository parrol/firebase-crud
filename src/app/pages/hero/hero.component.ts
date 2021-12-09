import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroModel } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero = new HeroModel();

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    if (form.invalid) return;

    if (this.hero.id) {
      this.heroesService.updateHero(this.hero)
        .subscribe(response => {
          console.log(response);
        })

    } else {

      this.heroesService.createHero(this.hero)
        .subscribe(response => {
          console.log(response);
        })
    }
  }

}
