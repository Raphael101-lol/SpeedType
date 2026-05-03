import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-name-input',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.css']
})
export class NameInputComponent {

  constructor(private router: Router) {}

  continue() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    if (name.trim()) {
      localStorage.setItem('username', name);
      this.router.navigate(['/mode']);
    }
  }
}