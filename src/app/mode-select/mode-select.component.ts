import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mode-select',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './mode-select.component.html',
  styleUrls: ['./mode-select.component.css']
})
export class ModeSelectComponent {
  modes = ['Easy', 'Medium', 'Hard', 'Extreme'];

  constructor(private router: Router) {}

  select(mode: string) {
    localStorage.setItem('mode', mode);
    this.router.navigate(['/game']);
  }
}