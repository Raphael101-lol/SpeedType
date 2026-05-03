import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {

  modes = ['easy', 'medium', 'hard', 'extreme'];
  allScores: any = { Easy: [], Medium: [], Hard: [], Extreme: [] };

  constructor(private api: ApiService) {
    this.loadScores();
  }

  loadScores() {
    this.api.getLeaderboard().subscribe((res: any) => {
      this.allScores = res;
    });
  }
  deleteScore(id: string) {
  this.api.deleteScore(id).subscribe(() => {
    this.loadScores();
  });
}
}