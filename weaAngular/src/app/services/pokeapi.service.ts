import { Injectable }              from '@angular/core';
import { HttpClient }              from '@angular/common/http';
import type { Observable }         from 'rxjs';

export interface Pokemon {
  name: string;
  url:  string;
}

export interface PokemonListResponse {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  Pokemon[];
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getAll(limit: number, offset: number): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(
      `${this.apiUrl}?limit=${limit}&offset=${offset}`
    );
  }
}
