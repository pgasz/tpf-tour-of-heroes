import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Actors } from '../models/actors.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Actors[] = [];

  // constructor(private heroService: HeroService) {}
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    // this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    this.firestoreService
      .getAll()
      .valueChanges()
      .subscribe((data) => {
        this.heroes = data;
      });
  }
  seedHeroes(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((user: any) => {
          this.add(user.name);
        });
      });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.firestoreService
      .create({ id: Math.random().toString(16).slice(2).toString(), name })
      .then(() => {
        console.log('Created new item successfully!');
      });
  }

  delete(hero: Actors): void {
    if (hero.id) {
      this.firestoreService.delete(hero.id).then((dss) => {
        console.log(dss);
        // coś nie działa
        this.getHeroes();
        console.log('Delete item successfully!');
      });
    }
  }
}
