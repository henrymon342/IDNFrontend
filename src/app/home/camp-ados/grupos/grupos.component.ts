import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.scss'
})
export class GruposComponent {
  title = 'grupos-frontend';
}
