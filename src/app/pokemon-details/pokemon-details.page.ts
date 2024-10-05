import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonBackButton,
  IonCard,
  IonChip,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonBackButton,
    IonCard,
    IonChip,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class PokemonDetailsPage implements OnInit {
  details: any;
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.pokemonService.getPokemonDetails(index).subscribe((data) => {
      console.log('details', data);
      this.details = data;
    });
  }
}
