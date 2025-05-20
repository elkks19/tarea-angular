import type { Routes }             from '@angular/router';
import { PokemonComponent }        from './pokemon.component';

export const routes: Routes = [
  { path: '', component: PokemonComponent },
  { path: '**', redirectTo: '' }
];
