import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule],
  templateUrl: './votaciones.component.html',
  styleUrl: './votaciones.component.scss'
})
export class VotacionesComponent {

}
