import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingsComponent {
  primary = '#BA7517';
  secondary = '#3B6D11';

  constructor() {
    const savedP = localStorage.getItem('primary');
    const savedS = localStorage.getItem('secondary');
    if (savedP) this.primary = savedP;
    if (savedS) this.secondary = savedS;
    this.apply();
  }

  changePrimary(event: any) {
    this.primary = event.target.value;
  }

  changeSecondary(event: any) {
    this.secondary = event.target.value;
  }

  apply() {
    document.documentElement.style.setProperty('--primary', this.primary);
    document.documentElement.style.setProperty('--secondary', this.secondary);
    localStorage.setItem('primary', this.primary);
    localStorage.setItem('secondary', this.secondary);
  }

  reset() {
    this.primary = '#BA7517';
    this.secondary = '#3B6D11';
    this.apply();
  }
}