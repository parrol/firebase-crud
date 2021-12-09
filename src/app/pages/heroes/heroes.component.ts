import { Component, OnInit } from '@angular/core';
import { HeroModel } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: []
})
export class HeroesComponent implements OnInit {

  heroes: HeroModel[] = [];
  loading = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.loading = true;
    this.heroesService.getHeroes()
      .subscribe(resp => {
        this.heroes = resp;
        this.loading = false;
      });
  }

  deleteHero(hero: HeroModel, i: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete ${hero.name}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (!resp.value) return;

      const id: any = hero.id;
      this.heroesService.deleteHero(id).subscribe();
      this.heroes.splice(i, 1);
      Swal.fire({
        title: `${hero.name} was deleted!`,
        icon: 'success'
      });
    });
  }

}
