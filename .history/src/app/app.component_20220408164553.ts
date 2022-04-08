import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: any;

  constructor(private router: Router) {
    let users = JSON.parse(localStorage.getItem('user'));
    if (users) {
      this.user = true;
      this.router.navigate(['/notes']);
    }
  }

  logout() {
    this.user = false;
    this.router.navigate(['/login']);
  }
  clearCache() {
    this.user = false;
    localStorage.clear();
    this.router.navigate(['/register']);
  }
}
