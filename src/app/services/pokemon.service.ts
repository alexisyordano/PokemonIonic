import { Injectable } from '@angular/core';
// import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { PokeApiResponse } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  getPokemon(offset = 0) {
    return this.httpClient
      .get<PokeApiResponse>(
        `${environment.baseUrl}api/v2/pokemon?offset=${offset}&limit=25`
      )
      .pipe(
        map((result) => {
          return result.results;
        }),
        map((pokemon) => {
          return pokemon.map((poke, index) => {
            poke.image = this.getPokemonImage(index + offset + 1);
            poke.pokeIndex = index + offset + 1;
            return poke;
          });
        })
      );
  }

  getPokemonImage(index: any) {
    return `${environment.imageUrl}${index}.png?`;
  }

  findPokemon(search = '') {
    console.log('le llego');
    return this.httpClient
      .get(`${environment.baseUrl}api/v2/pokemon/${search}`)
      .pipe(
        map((result: any) => {
          result['image'] = this.getPokemonImage(result['id']);
          result['pokeIndex'] = result['id'];
          return result;
        })
      );
  }

  getPokemonDetails(index: any) {
    return this.httpClient
      .get(`${environment.baseUrl}api/v2/pokemon/${index}`)
      .pipe(
        map((result: any) => {
          let sprites = Object.keys(result['sprites']);

          result['images'] = sprites
            .map((spriteKey) => result['sprites'][spriteKey])
            .filter((image) => image);
          return result;
        })
      );
  }
}
