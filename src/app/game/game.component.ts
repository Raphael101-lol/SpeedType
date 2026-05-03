import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  text = '';
  input = '';
  started = false;
  done = false;
  wpm = 0;
  accuracy = 100;
  seconds = 0;
  timer: any;
  mistakes = 0;
  totalTyped = 0;
  username = localStorage.getItem('username') || 'Player';
  mode = localStorage.getItem('mode') || 'easy';

  constructor(private router: Router, private api: ApiService) {
    this.newGame();
  }

  newGame() {
    const counts: any = { easy: 1, medium: 3, hard: 7, extreme: 11 };
    const count = counts[this.mode] || 1;

    this.api.getRandomText(this.mode).subscribe((res: any) => {
      const shuffled = res.quotes.sort(() => Math.random() - 0.5);
      this.text = shuffled.slice(0, count).map((q: any) => q.quote).join(' ');
      this.input = '';
      this.started = false;
      this.done = false;
      this.seconds = 0;
      this.wpm = 0;
      this.accuracy = 100;
      this.mistakes = 0;
      this.totalTyped = 0;
      clearInterval(this.timer);
    });
  }

  onType(event: Event) {
    if (this.done) return;

    let newInput = (event.target as HTMLInputElement).value;

    if (!this.started && newInput.length > 0) {
      this.started = true;
      let start = Date.now();
      this.timer = setInterval(() => {
        this.seconds = parseFloat(((Date.now() - start) / 1000).toFixed(2));
      }, 100);
    }

    if (newInput.length > this.input.length) {
      this.totalTyped++;
      if (newInput[newInput.length - 1] !== this.text[newInput.length - 1]) {
        this.mistakes++;
      }
      this.accuracy = Math.round(((this.totalTyped - this.mistakes) / this.totalTyped) * 100);
    }

    this.input = newInput;

    if (this.input === this.text) {
      this.done = true;
      clearInterval(this.timer);
      let minutes = this.seconds / 60;
      this.wpm = Math.round((this.text.length / 5) / minutes);
      this.accuracy = Math.round(((this.text.length - this.mistakes) / this.text.length) * 100);

      this.api.saveScore({
        username: this.username,
        wpm: this.wpm,
        accuracy: this.accuracy,
        mode: this.mode,
        time: this.seconds
      }).subscribe();
    }
  }

  getClass(i: number): string {
    if (i >= this.input.length) return '';
    return this.input[i] === this.text[i] ? 'correct' : 'wrong';
  }

  goMenu() {
    clearInterval(this.timer);
    this.router.navigate(['/menu']);
  }

  goLeaderboard() {
    clearInterval(this.timer);
    this.router.navigate(['/leaderboard']);
  }
}