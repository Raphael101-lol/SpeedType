import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NameInputComponent } from './name-input/name-input.component';
import { ModeSelectComponent } from './mode-select/mode-select.component';
import { SettingsComponent } from './setting/setting.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'game', component: GameComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'name', component: NameInputComponent },
  { path: 'mode', component: ModeSelectComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' }
];