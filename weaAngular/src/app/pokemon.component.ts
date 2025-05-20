import { Component, OnInit }  from '@angular/core';
import { CommonModule }       from '@angular/common';
import { PokemonService }     from './services/pokeapi.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemons: Array<{ name: string; url: string; id: number }> = [];
  loadingList = false;
  limit       = 20;
  offset      = 0;
  totalCount  = 0;

  constructor(private pokeSvc: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loadingList = true;
    this.pokeSvc.getAll(this.limit, this.offset)
      .subscribe(resp => {
        // Extraemos el ID de la URL para construir la ruta al sprite
        this.pokemons = resp.results.map(p => {
          const parts = p.url.split('/');
          const id = Number(parts[parts.length - 2]);
          return { ...p, id };
        });
        this.totalCount  = resp.count;
        this.loadingList = false;
      });
  }

  nextPage(): void {
    if (this.offset + this.limit < this.totalCount) {
      this.offset += this.limit;
      this.loadPokemons();
    }
  }

  prevPage(): void {
    if (this.offset - this.limit >= 0) {
      this.offset -= this.limit;
      this.loadPokemons();
    }
  }

  getSpriteUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
