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
  
  }

  
}
