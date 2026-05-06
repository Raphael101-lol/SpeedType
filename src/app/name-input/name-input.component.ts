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
    const pass = (document.getElementById('password') as HTMLInputElement).value;

    if (!name || !pass) {
      alert('Enter username and password');
      return;
    }

    const saved = localStorage.getItem('pwd_' + name);

    if (saved && saved !== pass) {
      alert('Wrong password');
      return;
    }

    if (!saved) {
      localStorage.setItem('pwd_' + name, pass);
      alert('New user created!');
    }

    localStorage.setItem('username', name);
    this.router.navigate(['/mode']);
  }

  changePassword() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const oldPass = (document.getElementById('password') as HTMLInputElement).value;
    const saved = localStorage.getItem('pwd_' + name);

    if (!saved) {
      alert('User not found');
      return;
    }

    if (saved !== oldPass) {
      alert('Wrong password');
      return;
    }

    const newPass = prompt('New password:');
    if (newPass) {
      localStorage.setItem('pwd_' + name, newPass);
      alert('Password changed!');
      (document.getElementById('password') as HTMLInputElement).value = '';
    }
  }

  deleteUser() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const pass = (document.getElementById('password') as HTMLInputElement).value;
    const saved = localStorage.getItem('pwd_' + name);

    if (!saved) {
      alert('User not found');
      return;
    }

    if (saved !== pass) {
      alert('Wrong password');
      return;
    }

    if (confirm(`Delete ${name}?`)) {
      localStorage.removeItem('pwd_' + name);
      if (localStorage.getItem('username') === name) {
        localStorage.removeItem('username');
      }
      alert('User deleted');
      (document.getElementById('name') as HTMLInputElement).value = '';
      (document.getElementById('password') as HTMLInputElement).value = '';
    }
  }
}