import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  
  styleUrls: ['./app.component.css'],
  template:` 
  <app-navbar></app-navbar>
        <app-header></app-header>
        
        <router-outlet></router-outlet>
        <app-footer></app-footer>
       
  
  `
})
export class AppComponent {
  title = 'myproject';
}
