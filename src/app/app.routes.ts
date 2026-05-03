import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu';
import { SettingsComponent } from './setting/setting.component';
import { NameInputComponent } from './name-input/name-input.component';
import { ModeSelectComponent } from './mode-select/mode-select.component';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'name', component: NameInputComponent },
  { path: 'mode', component: ModeSelectComponent },
  { path: 'game', component: GameComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '**', redirectTo: '' }
];