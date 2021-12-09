import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { HeroModel } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: []
})
export class HeroComponent implements OnInit {

  hero = new HeroModel();

  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute) { }

  //@Todo Validate params to be "new" or a valid id.

  ngOnInit(): void {
    const id: any = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.heroesService.getHero(id)
        .subscribe((resp: any) => {
          this.hero = resp;
          this.hero.id = id;
        })
    }
  }

  save(form: NgForm) {
    if (form.invalid) return;

    Swal.fire({
      title: 'wait',
      text: 'Saving info',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let petition: Observable<any>;

    if (this.hero.id) {
      petition = this.heroesService.updateHero(this.hero);

    } else {

      petition = this.heroesService.createHero(this.hero);
    }

    petition.subscribe(resp => {
      setTimeout(() => {
        Swal.fire({
          title: this.hero.name,
          text: 'Updated correctly',
          icon: 'success'
        });
      }, 500);
    })
  }

}
