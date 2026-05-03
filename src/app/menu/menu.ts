import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent {
  router = inject(Router);

  menuItems = [
    { label: 'Play', route: '/name', class: 'btn-primary' },
    { label: 'Leaderboard', route: '/leaderboard', class: 'btn-secondary' },
    { label: 'Settings', route: '/settings', class: 'btn-secondary' }
  ];

  go(route: string) {
    this.router.navigate([route]);
  }
}