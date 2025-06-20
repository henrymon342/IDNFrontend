import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";


@Component({
  selector: 'app-admi-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admi.usuarios.component.html',
  styleUrl: './admi.usuarios.component.scss'
})
export class AdmiUsuariosComponent {

  constructor() {
  }
}
