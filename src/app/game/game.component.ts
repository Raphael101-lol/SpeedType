import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  text = '';
  inputValue = '';
  started = false;
  done = false;
  wpm = 0;
  liveWpm = 0;
  accuracy = 100;
  seconds = 0;
  timer: any;
  mistakes = 0;
  totalTyped = 0;
  leaderboard: any[] = [];
  username = '';
  mode = '';

  constructor(private router: Router, private api: ApiService) {
    this.username = localStorage.getItem('username') || 'Player';
    this.mode = localStorage.getItem('mode') || 'Easy';
    this.newGame();
  }

  newGame() {
    const counts: any = { Easy: 1, Medium: 3, Hard: 7, Extreme: 11 };
    const count = counts[this.mode] || 1;

    this.api.getRandomText(this.mode).subscribe((res: any) => {
      const shuffled = res.quotes.sort(() => Math.random() - 0.5);
      this.text = shuffled.slice(0, count).map((q: any) => q.quote).join(' ');
      this.inputValue = '';
      this.started = false;
      this.done = false;
      this.seconds = 0;
      this.wpm = 0;
      this.liveWpm = 0;
      this.accuracy = 100;
      this.mistakes = 0;
      this.totalTyped = 0;
      this.leaderboard = [];
      if (this.timer) clearInterval(this.timer);
    });
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.inputValue = input.value;
    
    if (this.done) return;

    if (!this.started && this.inputValue.length > 0) {
      this.started = true;
      const start = Date.now();
      this.timer = setInterval(() => {
        this.seconds = parseFloat(((Date.now() - start) / 1000).toFixed(2));
        const minutes = this.seconds / 60;
        if (minutes > 0) {
          this.liveWpm = Math.round((this.inputValue.length / 5) / minutes);
        }
      }, 100);
    }

    if (this.inputValue.length > this.totalTyped) {
      this.totalTyped++;
      const lastChar = this.inputValue[this.inputValue.length - 1];
      const expectedChar = this.text[this.inputValue.length - 1];
      if (lastChar !== expectedChar) {
        this.mistakes++;
      }
      this.accuracy = Math.round(((this.totalTyped - this.mistakes) / this.totalTyped) * 100);
    }

    if (this.inputValue === this.text) {
      this.completeGame();
    }
  }

  completeGame() {
    this.done = true;
    clearInterval(this.timer);
    const minutes = this.seconds / 60;
    this.wpm = Math.round((this.text.length / 5) / minutes);
    this.accuracy = Math.round(((this.text.length - this.mistakes) / this.text.length) * 100);

    this.api.saveScore({
      username: this.username,
      wpm: this.wpm,
      accuracy: this.accuracy,
      mode: this.mode,
      time: this.seconds
    }).subscribe(() => {
      this.api.getLeaderboard().subscribe((res: any) => {
        this.leaderboard = res[this.mode] || [];
      });
    });
  }

  getClass(i: number): string {
    if (i >= this.inputValue.length) return '';
    return this.inputValue[i] === this.text[i] ? 'correct' : 'wrong';
  }

  goMenu() {
    if (this.timer) clearInterval(this.timer);
    this.router.navigate(['/menu']);
  }

  goModeSelect() {
    if (this.timer) clearInterval(this.timer);
    this.router.navigate(['/mode']);
  }
}