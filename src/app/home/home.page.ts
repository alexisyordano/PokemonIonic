import { Component, OnInit, ViewChild } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSearchbar,
  IonSkeletonText,
  IonButtons,
  IonMenuButton,
  IonMenu,
  IonModal,
  IonButton,
} from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { PokeApiResponse, PokemonData } from '../models/model';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    CommonModule,
    RouterLinkWithHref,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSearchbar,
    IonSkeletonText,
    IonButtons,
    IonMenuButton,
    IonMenu,
    IonModal,
    IonButton,
  ],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemons: PokemonData[] = [];
  isModalOpen = false;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(load = false, event?: any) {
    if (load) {
      this.offset += 25;
    }
    this.pokemonService.getPokemon(this.offset).subscribe((pokemon) => {
      this.pokemons = [...this.pokemons, ...pokemon];
      if (event) {
        event.target.complete();
      }

      if (this.offset == 125) {
        if (this.infiniteScroll) {
          this.infiniteScroll.disabled = true;
        }
      }
      console.log('data pokemon', pokemon);
    });
  }

  onSearchChange(event: any) {
    let value = event.detail.value;
    console.log('valor', value);
    if (value == '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.pokemonService.findPokemon(value).subscribe(
      (resp) => {
        this.pokemons = [resp];
      },
      (error) => {
        this.pokemons = [];
      }
    );
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
