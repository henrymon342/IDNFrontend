import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  template: `<app-navbar />`,
  styles: []
})
export class HomeComponent {

}
