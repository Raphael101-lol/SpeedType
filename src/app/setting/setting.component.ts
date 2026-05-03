import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingsComponent {
  primary = '#172fba';
  secondary = '#3B6D11';

  colors = [
    { label: 'Primary Color', value: this.primary },
    { label: 'Secondary Color', value: this.secondary }
  ];

  constructor() {
    const root = document.documentElement;
    this.primary = getComputedStyle(root).getPropertyValue('--primary').trim() || '#BA7517';
    this.secondary = getComputedStyle(root).getPropertyValue('--secondary').trim() || '#3B6D11';
  }

  onColorChange(value: string, type: string) {
    if (type === 'primary') this.primary = value;
    if (type === 'secondary') this.secondary = value;
  }

  apply() {
    document.documentElement.style.setProperty('--primary', this.primary);
    document.documentElement.style.setProperty('--secondary', this.secondary);
    localStorage.setItem('theme-primary', this.primary);
    localStorage.setItem('theme-secondary', this.secondary);
  }

  reset() {
    this.primary = '#BA7517';
    this.secondary = '#3B6D11';
    this.apply();
  }
}