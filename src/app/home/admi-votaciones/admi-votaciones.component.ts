import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule],
  templateUrl: './admi-votaciones.component.html',
  styleUrl: './admi-votaciones.component.scss'
})
export class AdmiVotacionesComponent {

  LINKS: string[] = ['JUEGOS', 'GRUPOS', 'REGLAS', 'ADMI'];
  activeLink: string = this.LINKS[0];

  onTabClick(nombreTab: string) {
    this.activeLink = nombreTab;
    console.log('Tab clicked:', nombreTab);
    // this.getEvents(nombreTab);
  }
}
