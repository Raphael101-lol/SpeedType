import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mode-select',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './mode-select.component.html',
  styleUrls: ['./mode-select.component.css']
})
export class ModeSelectComponent {

  modes = ['easy', 'medium', 'hard', 'extreme'];

  constructor(private router: Router) {}

  select(mode: string) {
    localStorage.setItem('mode', mode);
    this.router.navigate(['/game']);
  }
}