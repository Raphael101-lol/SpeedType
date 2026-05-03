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
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (!name.trim()) {
      alert('Please enter a username');
      return;
    }

    if (!password.trim()) {
      alert('Please enter a password');
      return;
    }

    const stored = localStorage.getItem('password_' + name);

    if (stored && stored !== password) {
      alert('Wrong password for this username');
      return;
    }

    localStorage.setItem('username', name);
    localStorage.setItem('password_' + name, password);
    this.router.navigate(['/mode']);
  }

  changePassword() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (!name.trim() || !password.trim()) {
      alert('Please enter your username and old password');
      return;
    }

    const stored = localStorage.getItem('password_' + name);

    if (!stored) {
      alert('Username not found');
      return;
    }

    if (stored !== password) {
      alert('Wrong password');
      return;
    }

    const newPassword = prompt('Enter new password');

    if (!newPassword) {
      alert('New password cannot be empty');
      return;
    }

    localStorage.setItem('password_' + name, newPassword);
    alert('Password changed successfully');
  }

  deleteUser() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (!name.trim() || !password.trim()) {
      alert('Please enter your username and password');
      return;
    }

    const stored = localStorage.getItem('password_' + name);

    if (!stored) {
      alert('Username not found');
      return;
    }

    if (stored !== password) {
      alert('Wrong password');
      return;
    }

    const confirm = window.confirm(`Are you sure you want to delete "${name}"?`);

    if (confirm) {
      localStorage.removeItem('password_' + name);
      localStorage.removeItem('username');
      alert('User deleted');
    }
  }
}